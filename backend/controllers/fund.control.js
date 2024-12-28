import Event from "../models/event.model.js";
import Join from "../models/join.model.js";
import Fund from "../models/fund.model.js";
import User from "../models/user.model.js";
import Officer from "../models/officer.model.js";
import Sponsor from "../models/sponsor.model.js";

export const provide = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event Not Found",
      });
    }

    const officer = await Officer.findOne({ _id: req.user._id });
    if (!officer) {
      return res.status(400).json({
        success: false,
        message: "Officer Not Found",
      });
    }

    const amount = Number(req.body.amount);
    if (amount <= 0) {
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

    event.funds += amount;
    await event.save();

    const fund = await Fund.create({
      amount: amount,
			funds: event.funds,
			revenue: event.revenue,
      event: event._id,
      officer: req.user._id,
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
		const funds = await Fund.find({ officer: req.user._id })
		.populate({ path : "event", populate : { path : "club" }});
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
