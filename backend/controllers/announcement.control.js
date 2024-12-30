import Event from "../models/event.model.js";
import Announcement from "../models/announcement.model.js";

export const create = async (req, res) => {
  try {
    const { title, content, eventId } = req.body;
    
    // Check if user is authorized to create announcements
    const isOfficer = req.user.role === "Officer";
    // Check if user is a panel member with designation other than "Member"
    const isPanelMember = req.user.role === "Panel" && req.user.designation !== "Member";
    
    if (!isPanelMember && !isOfficer) {
      return res.status(403).json({
        success: false,
        message: "Only club panel officials and officers can create announcements"
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

      // Check if panel member has permission for this event's club
      if (isPanelMember) {
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
    } else if (isPanelMember) {
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
    const announcements = await Announcement.find()
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

export const deleteAnnouncement = async (req, res) => {
  try {
    // Only officers can delete announcements
    if (req.user.role !== "Officer") {
      return res.status(403).json({
        success: false,
        message: "Only officers can delete announcements"
      });
    }

    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    await Announcement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete announcement",
      error: error.message
    });
  }
};