import Request from "../models/request.model.js";
import Startup from "../models/startup.model.js";
import Event from "../models/event.model.js";
import Join from "../models/join.model.js";
import User from "../models/user.model.js";
import Club from "../models/club.model.js";
import Officer from "../models/officer.model.js";
import Panel from "../models/panel.model.js";
import Sponsor from "../models/sponsor.model.js";
import Guest from "../models/guest.model.js";
import Fund from "../models/fund.model.js";
import Offer from "../models/offer.model.js";

export const check = async (req, res) => {
	try {
		const requested = await Request.findOne({ club: req.user.club });
		const approved = await Startup.findOne({ club: req.user.club });
		if (requested || approved) {
			return res.status(200).json({
				success: false,
				message: "Already Requested/Approved Event",
				requested,
				approved,
			});
		}

		res.status(200).json({
			success: true,
			message: "Event Request Available",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const request = async (req, res) => {
	try {
		const requested = await Request.findOne({ club: req.user.club });
		if (requested) {
			return res.status(400).json({
				success: false,
				message: "Already Requested Event",
			});
		}

		const request = new Request({
			title: req.body.title,
			description: req.body.description,
			venue: req.body.venue,
			date: req.body.date,
			panel: req.user._id,
			club: req.user.club,
		});

		await request.save();
		res.status(201).json({
			success: true,
			message: "Event Requested Successfully",
			request,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const requested = async (req, res) => {
	try {
		const proposal = await Request.find({ club: req.user.club }).populate("panel club");
		if (!proposal) {
			return res.status(400).json({
				success: false,
				message: "No Requested Event",
			});
		}

		res.status(200).json({
			success: true,
			message: "Proposals Fetched Successfully",
			proposal,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const cancel = async (req, res) => {
	try {
		const request = await Request.findByIdAndDelete(req.params.id);
		if (!request) {
			return res.status(400).json({
				success: false,
				message: "Request Not Found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Event Request Cancelled",
			request,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const proposals = async (req, res) => {
	try {
		const requests = await Request.find({}).populate("panel club");
		if (!requests) {
			return res.status(400).json({
				success: false,
				message: "No Event Proposals",
			});
		}

    res.status(200).json({
      success: true,
      message: "Proposals fetched successfully",
      requests,
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
		const proposal = await Request.findById(req.params.id).populate("club");
		if (!proposal) {
			return res.status(400).json({
				success: false,
				message: "Proposal Does Not Exist",
			});
		}

		const cost = Number(req.body.cost);
		if (cost <= 1000) {
			return res.status(400).json({
				success: false,
				message: "Invalid Cost",
			});
		}

		const capacity = Number(req.body.capacity);
		if (capacity <= 0) {
			return res.status(400).json({
				success: false,
				message: "Invalid Capacity",
			});
		}

		if (capacity > 1000) {
			return res.status(400).json({
				success: false,
				message: "Capacity Limit Exceeded",
			});
		}

		const startup = new Startup({
			title: proposal.title,
			description: proposal.description,
			venue: proposal.venue,
			date: proposal.date,
			club: proposal.club,
			cost: cost,
			capacity: capacity,
			officer: req.user.id,
		});

		await startup.save();
		await Request.findByIdAndDelete(req.params.id);
		res.status(201).json({
			success: true,
			message: "Event Approved Successfully",
			startup,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const decline = async (req, res) => {
	try{	
		const proposal = await Request.findByIdAndDelete(req.params.id);
		if (!proposal) {
			return res.status(400).json({
				success: false,
				message: "Request Does Not Exist",
			});
		}

		res.status(200).json({
			success: true,
			message: "Event Request Declined",
			proposal,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const approvals = async (req, res) => {
	try {
		const startup = await Startup.find({ club: req.user.club }).populate("officer club");
		if (!startup) {
			return res.status(400).json({
				success: false,
				message: "Request Not Approved",
			});
		}

		res.status(200).json({
			success: true,
			message: "Approvals Fetched Successfully",
			startup,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const launch = async (req, res) => {
	try {
		const startup = await Startup.findById(req.params.id).populate("club");
		if (!startup) {
			return res.status(400).json({
				success: false,
				message: "Approval Not Found",
			});
		}

		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "Cover Upload Failed",
			});
		}

		const entry = Number(req.body.entry);
		if (entry <= 0) {
			return res.status(400).json({
				success: false,
				message: "Invalid Entry",
			});
		}

		if (entry > 1000) {
			return res.status(400).json({
				success: false,
				message: "Entry Limit Exceeded",
			});
		}

		const event = new Event({
			title: startup.title,
			description: startup.description,
			venue: startup.venue,
			date: startup.date,
			club: startup.club,
			cost: startup.cost,
			capacity: startup.capacity,
			officer: startup.officer,
			cover: req.file.path.replace(/\\/g, '/'),
			entry: entry,
			funds: 0,
			revenue: 0,
			guests: 0,
		});

		const clubevent = await event.save();
		const hosts = await Club.findById(clubevent.club);
		for (let host of hosts.panels) {
			const join = new Join({
				user: host,
				event: clubevent._id,
			});
			await join.save();

			const user = await User.findById(host);
			user.credits -= clubevent.entry;
			await user.save();

			clubevent.guests++;
			clubevent.revenue += clubevent.entry;
			await clubevent.save();
		}

		const hostclub = await Club.findById(clubevent.club);
		hostclub.event = clubevent._id;
		await hostclub.save();

		if (hostclub.reserve < clubevent.cost) {
			clubevent.funds += hostclub.reserve;
			await clubevent.save();

			hostclub.reserve -= clubevent.funds;
			await hostclub.save();
		} else {
			clubevent.funds += clubevent.cost;
			await clubevent.save();

			hostclub.reserve -= clubevent.cost;
			await hostclub.save();
		}

		await Startup.findByIdAndDelete(req.params.id);
		res.status(201).json({
			success: true,
			message: "Event Launched Successfully",
			event,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const postpone = async (req, res) => {
	try {
		const startup = await Startup.findByIdAndDelete(req.params.id);
		if (!startup) {
			return res.status(400).json({
				success: false,
				message: "Approval Not Found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Event Has Been Postponed",
			startup,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const campus = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.user.id);
    if (sponsor && sponsor.sponsored) {
			const offer = await Offer.find({ sponsor: req.user.id, event: sponsor.sponsored });
			if (offer.length !== 0) {
				return res.status(200).json({
					success: true,
					message: "Sponsorship Offered",
					events: [],
				});
			}
			
			const event = await Event.findById(sponsor.sponsored).populate("club");
      return res.status(200).json({
        success: true,
        message: "Complete Sponsorship",
        events: [event],
      });
    }

    const joins = await Join.find({ user: req.user.id });
    const joinedEvents = joins.map((join) => join.event.toString());

    const offers = await Offer.find({ sponsor: req.user.id });
    const offeredEvents = offers.map((offer) => offer.event.toString());

    const excludedEvents = [...new Set([...joinedEvents, ...offeredEvents])];
    const events = await Event.find({ _id: { $nin: excludedEvents } }).populate("club");

    return res.status(200).json({
      success: true,
      message: "Events Fetched Successfully",
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

export const join = async (req, res) => {
	try {
		const joined = await Join.findOne({ 
			user: req.user.id, 
			event: req.params.id,
		});
		if (joined) {
			return res.status(400).json({
				success: false,
				message: "User Joined Event",
			});
		}

		const user = await User.findById(req.user.id);
		const event = await Event.findById(req.params.id);
		if (user.credits < event.entry) {
			return res.status(400).json({
				success: false,
				message: "Insufficient Credits",
			});
		}

		if (event.guests >= event.capacity) {
			return res.status(400).json({
				success: false,
				message: "Event Capacity Full",
			});
		}

		user.credits -= event.entry;
		await user.save();

		event.guests++;
		event.revenue += event.entry;
		await event.save();

		const join = new Join({
			user: req.user.id,
			event: req.params.id,
		});

		await join.save();
		res.status(201).json({
			success: true,
			message: "Joined Event Successfully",
			join,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const joined = async (req, res) => {
  try {
    let joined = await Join.find({ user: req.user.id })
      .populate({ path: "event", populate: { path: "club" } });

    if (!joined) {
      return res.status(400).json({
        success: false,
        message: "No Joined Event",
      });
    }

    if (req.user.role === "Panel") {
      joined = joined.filter(join => join.event.club.toString() !== req.user.club.toString());
    }

    res.status(200).json({
      success: true,
      message: "Joined Events Fetched Successfully",
      joined,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const leave = async (req, res) => {
	try {
		const joined = await Join.findOne({ 
			user: req.user.id, 
			event: req.params.id 
		});
		if (!joined) {
			return res.status(400).json({
				success: false,
				message: "User Not Joined Event",
			});
		}

		const user = await User.findById(req.user.id);
		const event = await Event.findById(req.params.id);

		user.credits += event.entry;
		await user.save();

		event.guests--;
		event.revenue -= event.entry;
		await event.save();

		const left = await Join.findByIdAndDelete(joined._id);
		res.status(200).json({
			success: true,
			message: "Left Event Successfully",
			left,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const club = async (req, res) => {
  try {
    const clubevent = await Event.find({ club: req.user.club }).populate("club officer");
    if (!clubevent) {
      return res.status(400).json({
        success: false,
        message: "No Event Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Events Fetched Successfully",
      clubevent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
