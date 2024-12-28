import Event from "../models/event.model.js";
import Join from "../models/join.model.js";
import Fund from "../models/fund.model.js";
import User from "../models/user.model.js";
import Officer from "../models/officer.model.js";
import Sponsor from "../models/sponsor.model.js";
import Offer from "../models/offer.model.js";
import e from "express";

export const provide = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event Not Found",
      });
    }

		const officer = await Officer.findById(req.user.id);
    if (!officer) {
      return res.status(400).json({
        success: false,
        message: "Officer Not Found",
      });
    }

    const amount = Number(req.body.amount);
    if (amount < 10000) {
      return res.status(400).json({
        success: false,
        message: "Invalid Amount",
      });
    }

    if (amount > req.user.credits) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Credits",
      });
    }
		
    officer.credits -= amount;
    await officer.save();

    officer.funds += amount;
    await officer.save();

		const prevfunds = event.funds;
    event.funds += amount;
    await event.save();

    const fund = await Fund.create({
      amount: amount,
			funds: prevfunds,
      event: event._id,
      officer: officer._id,
    });

    await fund.save();
    res.status(200).json({
      success: true,
      message: "Fund Provided Successfully",
      fund,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const funded = async (req, res) => {
	try {
		const funds = await Fund.find({}).populate("event officer sponsor");
		res.status(200).json({
			success: true,
			message: "Funds Fetched Successfully",
			funds,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const drop = async (req, res) => {
	try {
		const fund = await Fund.findById(req.params.id).populate("event");
		if (!fund) {
			return res.status(400).json({
				success: false,
				message: "Fund Not Found",
			});
		}

		const event = await Event.findById(fund.event);
		event.funds -= fund.amount;
		await event.save();

		const officer = await Officer.findById(fund.officer);
		const sponsor = await Sponsor.findById(fund.sponsor);
		if (sponsor) {
			sponsor.funds -= fund.amount;
			await sponsor.save();

			sponsor.credits += fund.amount;
			await sponsor.save();
		} else {
			officer.funds -= fund.amount;
			await officer.save();

			officer.credits += fund.amount;
			await officer.save();
		}
		
		await Fund.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "Fund Dropped Successfully",
			fund,
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
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(400).json({
				success: false,
				message: "Event Not Found",
			});
		}

		const sponsor = await Sponsor.findById(req.user.id);
		if (!sponsor) {
			return res.status(400).json({
				success: false,
				message: "Sponsor Not Found",
			});
		}

		if (sponsor.sponsored && sponsor.sponsored.toString() !== event._id.toString()) {
			return res.status(400).json({
				success: false,
				message: "Unauthorized Access",
			});
		}

		const amount = Number(req.body.amount);
		if (amount < 10000) {
			return res.status(400).json({
				success: false,
				message: "Invalid Amount",
			});
		}

		if (amount > sponsor.credits) {
			return res.status(400).json({
				success: false,
				message: "Insufficient Credits",
			});
		}

		sponsor.credits -= amount;
		await sponsor.save();

		const offer = await Offer.create({
			amount: amount,
			event: event._id,
			sponsor: req.user._id,
		});

		await offer.save();
		res.status(200).json({
			success: true,
			message: "Fund Provided Successfully",
			offer,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const offered = async (req, res) => {
	try {
		const offers = await Offer.find({ sponsor: req.user.id }).populate(
			[
				{
					path: "event",
					populate: {
						path: "club",
					},
				},
				{
					path: "sponsor",
				},
			]
		);
		res.status(200).json({
			success: true,
			message: "Offers Fetched Successfully",
			offers,
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
		const offer = await Offer.findById(req.params.id).populate("event");
		if (!offer) {
			return res.status(400).json({
				success: false,
				message: "Offer Not Found",
			});
		}

		const sponsor = await Sponsor.findById(offer.sponsor);
		if (!sponsor) {
			return res.status(400).json({
				success: false,
				message: "Sponsor Not Found",
			});
		}

		sponsor.credits += offer.amount;
		await sponsor.save();

		await Offer.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "Offer Cancelled Successfully",
			offer,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const offers = async (req, res) => {
	try {
		const offers = await Offer.find({}).populate("event sponsor");
		res.status(200).json({
			success: true,
			message: "Offers Fetched Successfully",
			offers,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const accept = async (req, res) => {
	try {
		const offer = await Offer.findById(req.params.id).populate("event sponsor");
		if (!offer) {
			return res.status(400).json({
				success: false,
				message: "Offer Not Found",
			});
		}

		const officer = await Officer.findById(req.user.id);
		if (!officer) {
			return res.status(400).json({
				success: false,
				message: "Officer Not Found",
			});
		}

		const event = await Event.findById(offer.event);
		if (!event) {
			return res.status(400).json({
				success: false,
				message: "Event Not Found",
			});
		}

		const sponsor = await Sponsor.findById(offer.sponsor);
		if (!sponsor) {
			return res.status(400).json({
				success: false,
				message: "Sponsor Not Found",
			});
		}

		if (sponsor.sponsored && sponsor.sponsored.toString() !== event._id.toString()) {
			return res.status(400).json({
				success: false,
				message: "Unauthorized Access",
			});
		}

		const prevFunds = event.funds;
		event.funds += offer.amount;
		await event.save();

		sponsor.funds += offer.amount;
		await sponsor.save();

		if (sponsor.sponsored) {
			await Sponsor.updateOne({ _id: sponsor._id }, { $unset: { sponsored: 1 } });
		}

		const fund = await Fund.create({
			amount: offer.amount,
			funds: prevFunds,
			event: offer.event,
			sponsor: offer.sponsor,
			officer: officer._id,
		});

		await fund.save();
		await Offer.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "Offer Accepted Successfully",
			offer,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const reject = async (req, res) => {
	try {
		const offer = await Offer.findById(req.params.id).populate("event sponsor");
		if (!offer) {
			return res.status(400).json({
				success: false,
				message: "Offer Not Found",
			});
		}

		const sponsor = await Sponsor.findById(offer.sponsor);
		if (!sponsor) {
			return res.status(400).json({
				success: false,
				message: "Sponsor Not Found",
			});
		}

		sponsor.credits += offer.amount;
		await sponsor.save();

		await Offer.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "Offer Rejected Successfully",
			offer,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const sponsored = async (req, res) => {
	try {
		const funds = await Fund.find({ sponsor: req.user.id }).populate("event officer sponsor");
		res.status(200).json({
			success: true,
			message: "Funds Fetched Successfully",
			funds,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};
