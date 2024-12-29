import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import Club from "../models/club.model.js";
import Register from "../models/register.model.js";
import Guest from "../models/guest.model.js";
import Panel from "../models/panel.model.js";
import Apply from "../models/apply.model.js";
import Sponsor from "../models/sponsor.model.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";


export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const register = await Register.findOne({ email });
		const apply = await Apply.findOne({ email });
		if(register || apply) {
			return res.status(400).json({
				success: false,
				message: "Request Pending Approval",
			});
		}
		
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Email or Password",
			});
		}

		const pass = await bcryptjs.compare(password, user.password);
		if (!pass) {
			return res.status(400).json({
				success: false,
				message: "Invalid Email or Password",
			});
		}

		const type = user.role;
		const payload = { id: user._id };
		const prod = process.env.NODE_ENV === "production";
		const token = jwt.sign(payload, process.env.JWT_SECRET);

		res.cookie("type", type, { httpOnly: true, secure: prod });
		res.cookie("token", token, { httpOnly: true, secure: prod });
		return res.status(200).json({
			success: true,
			message: "Logged In Successfully",
			token,
			type,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const register = async (req, res) => {
	const { name, club, phone, email, password } = req.body;

	try {
		const guest = await Guest.findOne({ email });
		if (guest) {
			return res.status(400).json({
				success: false,
				message: "Guest Already Exists",
			});
		}

		const request = await Register.findOne({ email });
		if (request) {
			return res.status(400).json({
				success: false,
				message: "Request Already Sent",
			});
		}

		if (password.length < 4) {
			throw new Error("Password Must Be At Least 4 Characters Long");
		}
		const hashedPassword = await bcryptjs.hash(password, 12);

		const register = new Register({
			name,
			phone,
			email,
			password: hashedPassword,
		});

		if (club) {
			const clubObj = await Club.findById(club);
			if (!clubObj) {
				return res.status(400).json({
					success: false,
					message: "Invalid Club Selected",
				});
			}
			register.club = clubObj._id;
		}

		await register.save();

		return res.status(201).json({
			success: true,
			message: "Request Sent Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const sponsor = async (req, res) => {
	const { name, company, event, phone, email, password } = req.body;

	try {
		const sponsor = await Sponsor.findOne({ email });
		if (sponsor) {
			return res.status(400).json({
				success: false,
				message: "Sponsor Already Exists",
			});
		}

		const request = await Register.findOne({ email });
		if (request) {
			return res.status(400).json({
				success: false,
				message: "Request Already Sent",
			});
		}

		if (password.length < 4) {
			throw new Error("Password Must Be At Least 4 Characters Long");
		}
		const hashedPassword = await bcryptjs.hash(password, 12);

		const apply = new Apply({
			name,
			company,
			phone,
			email,
			password: hashedPassword,
		});

		if (event) {
			const eventObj = await Event.findById(event);
			if (!eventObj) {
				return res.status(400).json({
					success: false,
					message: "Invalid Event Selected",
				});
			}
			apply.event = eventObj._id;
		}

		await apply.save();

		return res.status(201).json({
			success: true,
			message: "Request Sent Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const logout = async (req, res) => {
	try {
		const prod = process.env.NODE_ENV === "production";
		res.clearCookie("token", { httpOnly: true, secure: prod });
		res.clearCookie("type", { httpOnly: true, secure: prod });
		res.status(200).json({
			success: true,
			message: "Logged Out Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const profile = async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User Not Found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Profile Fetched Successfully",
			user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const access = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "User Validated Successfully",
		user: req.user,
	});
};

export const clubs = async (req, res) => {
	try {
		const clubs = await Club.find({}, { _id: 1, name: 1 });
		res.status(200).json({
			success: true,
			message: "Clubs fetched successfully",
			clubs,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const events = async (req, res) => {
	try {
		const events = await Event.find({}, { _id: 1, title: 1 });
		res.status(200).json({
			success: true,
			message: "Events fetched successfully",
			events,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const registrations = async (req, res) => {
  try {
    const registrations = await Register.find({}).populate("club");
    res.status(200).json({
      success: true,
      message: "Registrations Fetched Successfully",
      registrations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error", 
      error: error.message,
    });
  }
};

export const approve = async (req, res) => {
  try {
    const registration = await Register.findById(req.params.id);
    if (!registration) {
      return res.status(400).json({
        success: false,
        message: "Registration Not Found",
      });
    }

    // Create base user data
    const userData = {
      name: registration.name,
      phone: registration.phone,
      email: registration.email,
      password: registration.password, // Password is already hashed
      credits: 1000
    };

    // Create either Panel or Guest based on club existence
    const user = registration.club 
      ? await Panel.create({
          ...userData,
          club: registration.club,
          designation: "Member"
        })
      : await Guest.create(userData);

    // Delete registration after successful user creation
    await Register.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true, 
      message: "Registration Approved Successfully",
      registration,
    });
  } catch (error) {
    console.error('Registration approval error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export const reject = async (req, res) => {
  try {
    const registration = await Register.findById(req.params.id);
    if (!registration) {
      return res.status(400).json({
        success: false,
        message: "Registration Not Found",
      });
    }

    await Register.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Registration Rejected Successfully", 
      registration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all sponsorship applications
export const sponsorships = async (req, res) => {
  try {
    // Only fetch pending sponsor applications
    const sponsorships = await Apply.find({}).populate("event");
    
    res.status(200).json({
      success: true,
      message: "Sponsorships Fetched Successfully",
      sponsorships,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Approve a sponsorship application
export const approveSponsor = async (req, res) => {
  try {
    // Find the application
    const application = await Apply.findById(req.params.id);
    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Application Not Found",
      });
    }

    // Create new sponsor account with role
    const sponsorData = {
      name: application.name,
      email: application.email,
      phone: application.phone,
      password: application.password, // Password is already hashed
      role: "Sponsor",
      credits: 100000, // Initial credits
      company: application.company,
    };

    if (application.event) {
      sponsorData.sponsored = application.event;
    }

    // Create the sponsor
    const sponsor = await Sponsor.create(sponsorData);

    // Delete the application after successful sponsor creation
    await Apply.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Sponsorship Approved Successfully",
      sponsor,
    });
  } catch (error) {
    console.error("Sponsor approval error:", error); // Add error logging
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Reject a sponsorship application
export const rejectSponsor = async (req, res) => {
  try {
    const application = await Apply.findById(req.params.id);
    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Application Not Found",
      });
    }

    // Delete the rejected application
    await Apply.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Sponsorship Rejected Successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
