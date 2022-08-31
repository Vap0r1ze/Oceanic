"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
const Routes = __importStar(require("../util/Routes"));
class GuildScheduledEvent extends Base_1.default {
    /** The id of the channel in which the event will be hosted. `null` if entityType is `EXTERNAL` */
    channel;
    /** The creator of the event. Not present on events created before October 25th, 2021. */
    creator;
    /** The description of the event. */
    description;
    /** The id of the entity associated with the event. */
    entityID;
    /** The [metadata](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type) associated with the event. */
    entityMetadata;
    /** The [entity type](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) of the event */
    entityType;
    /** The guild this scheduled event belongs to. */
    guild;
    /** The id of the guild this scheduled event belongs to. */
    guildID;
    /** The cover */
    image;
    /** The name of the event. */
    name;
    /** The [privacy level](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level) of the event. */
    privacyLevel;
    /** The time at which the event will end. Required if entityType is `EXTERNAL`. */
    scheduledEndTime;
    /** The time at which the event will start. */
    scheduledStartTime;
    /** The [status](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) of the event. */
    status;
    /** The number of users subscribed to the event. */
    userCount;
    constructor(data, client) {
        super(data.id, client);
        if (data.creator)
            this.creator = this._client.users.update(data.creator);
        this.guild = this._client.guilds.get(data.guild_id);
        this.guildID = data.guild_id;
        this.userCount = 0;
        this.update(data);
    }
    update(data) {
        if (data.channel_id !== undefined)
            this.channel = data.channel_id === null ? null : this._client.getChannel(data.channel_id);
        if (data.description !== undefined)
            this.description = data.description;
        if (data.entity_id !== undefined)
            this.entityID = data.entity_id;
        if (data.entity_metadata !== undefined)
            this.entityMetadata = data.entity_metadata;
        if (data.entity_type !== undefined)
            this.entityType = data.entity_type;
        if (data.image !== undefined)
            this.image = data.image;
        if (data.name !== undefined)
            this.name = data.name;
        if (data.privacy_level !== undefined)
            this.privacyLevel = data.privacy_level;
        if (data.scheduled_end_time !== undefined)
            this.scheduledEndTime = data.scheduled_end_time ? new Date(data.scheduled_end_time) : null;
        if (data.scheduled_start_time !== undefined)
            this.scheduledStartTime = new Date(data.scheduled_start_time);
        if (data.status !== undefined)
            this.status = data.status;
        if (data.user_count !== undefined)
            this.userCount = data.user_count;
    }
    /**
     * Delete this scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    async deleteScheduledEvent(reason) {
        return this._client.rest.guilds.deleteScheduledEvent(this.guildID, this.id, reason);
    }
    /**
     * The url of this event's cover image.
     * @param format The format of the image.
     * @param size The size of the image.
     */
    imageURL(format, size) {
        return !this.image ? null : this._client.util.formatImage(Routes.GUILD_SCHEDULED_EVENT_COVER(this.id, this.image), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            channel: this.channel?.id || null,
            creator: this.creator?.toJSON(),
            description: this.description,
            entityID: this.entityID,
            entityMetadata: this.entityMetadata,
            entityType: this.entityType,
            guild: this.guildID,
            image: this.image,
            name: this.name,
            privacyLevel: this.privacyLevel,
            scheduledEndTime: this.scheduledEndTime?.getTime() || null,
            scheduledStartTime: this.scheduledStartTime.getTime(),
            status: this.status,
            userCount: this.userCount
        };
    }
}
exports.default = GuildScheduledEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRTY2hlZHVsZWRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0d1aWxkU2NoZWR1bGVkRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQU0xQix1REFBeUM7QUFJekMsTUFBcUIsbUJBQW9CLFNBQVEsY0FBSTtJQUNqRCxrR0FBa0c7SUFDbEcsT0FBTyxDQUFzQjtJQUM3Qix5RkFBeUY7SUFDekYsT0FBTyxDQUFRO0lBQ2Ysb0NBQW9DO0lBQ3BDLFdBQVcsQ0FBaUI7SUFDNUIsc0RBQXNEO0lBQ3RELFFBQVEsQ0FBZ0I7SUFDeEIsb0xBQW9MO0lBQ3BMLGNBQWMsQ0FBc0M7SUFDcEQsMEtBQTBLO0lBQzFLLFVBQVUsQ0FBaUM7SUFDM0MsaURBQWlEO0lBQ2pELEtBQUssQ0FBUTtJQUNiLDJEQUEyRDtJQUMzRCxPQUFPLENBQVM7SUFDaEIsZ0JBQWdCO0lBQ2hCLEtBQUssQ0FBaUI7SUFDdEIsNkJBQTZCO0lBQzdCLElBQUksQ0FBUztJQUNiLDhLQUE4SztJQUM5SyxZQUFZLENBQW1DO0lBQy9DLGtGQUFrRjtJQUNsRixnQkFBZ0IsQ0FBYztJQUM5Qiw4Q0FBOEM7SUFDOUMsa0JBQWtCLENBQU87SUFDekIsZ0tBQWdLO0lBQ2hLLE1BQU0sQ0FBOEI7SUFDcEMsbURBQW1EO0lBQ25ELFNBQVMsQ0FBUztJQUNsQixZQUFZLElBQXVCLEVBQUUsTUFBYztRQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRVMsTUFBTSxDQUFDLElBQWdDO1FBQzdDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBZSxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUM7UUFDNUksSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakUsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0UsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdEksSUFBSSxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE1BQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFhLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUk7WUFDNUMsT0FBTyxFQUFhLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQzFDLFdBQVcsRUFBUyxJQUFJLENBQUMsV0FBVztZQUNwQyxRQUFRLEVBQVksSUFBSSxDQUFDLFFBQVE7WUFDakMsY0FBYyxFQUFNLElBQUksQ0FBQyxjQUFjO1lBQ3ZDLFVBQVUsRUFBVSxJQUFJLENBQUMsVUFBVTtZQUNuQyxLQUFLLEVBQWUsSUFBSSxDQUFDLE9BQU87WUFDaEMsS0FBSyxFQUFlLElBQUksQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBZ0IsSUFBSSxDQUFDLElBQUk7WUFDN0IsWUFBWSxFQUFRLElBQUksQ0FBQyxZQUFZO1lBQ3JDLGdCQUFnQixFQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxJQUFJO1lBQzVELGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7WUFDckQsTUFBTSxFQUFjLElBQUksQ0FBQyxNQUFNO1lBQy9CLFNBQVMsRUFBVyxJQUFJLENBQUMsU0FBUztTQUNyQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0ZELHNDQTJGQyJ9