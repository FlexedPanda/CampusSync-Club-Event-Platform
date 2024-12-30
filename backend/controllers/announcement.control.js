import Event from "../models/event.model.js";
import Announcement from "../models/announcement.model.js";

export const create = async (req, res) => {
  try {
    console.log("User role:", req.user.role);
    console.log("User club:", req.user.club);

    const { title, content, eventId } = req.body;
    
    // Require eventId for Panel users
    if (req.user.role === "Panel" && !eventId) {
      return res.status(400).json({
        success: false,
        message: "Event selection is required for panel members"
      });
    }

    const announcementData = {
      title,
      content,
      creator: req.user.id
    };

    if (eventId) {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found"
        });
      }

      // Compare club IDs correctly - use _id from populated user.club object
      if (req.user.role === "Panel") {
        const userClubId = req.user.club._id.toString();
        const eventClubId = event.club.toString();

        if (userClubId !== eventClubId) {
          return res.status(403).json({
            success: false,
            message: "You can only create announcements for your club's events"
          });
        }
      }

      announcementData.event = eventId;
      announcementData.club = event.club;
    } else if (req.user.role === "Panel") {
      announcementData.club = req.user.club._id;
    }

    const announcement = await Announcement.create(announcementData);
    
    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create announcement",
      error: error.message
    });
  }
};

export const getAll = async (req, res) => {
  try {
    let query = {};
    
    // If panel, only show their club's announcements
    if (req.user.role === "Panel") {
      query.club = req.user.club._id;
    }

    const announcements = await Announcement.find(query)
      .populate("creator", "name")
      .populate("club", "name")
      .populate("event", "title")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      message: "Announcements fetched successfully",
      announcements
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error: error.message
    });
  }
};

export const getAvailableEvents = async (req, res) => {
  try {
    let query = {};
    
    // For panel members, only show their club's events
    if (req.user.role === "Panel") {
      query.club = req.user.club;
    }

    const events = await Event.find(query)
      .select('_id title')
      .sort('-createdAt');

    res.json({
      success: true,
      events
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message
    });
  }
};