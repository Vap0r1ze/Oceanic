import Base from "./Base";
import Channel from "./Channel";
import Guild from "./Guild";
import type ScheduledEvent from "./ScheduledEvent";
import type User from "./User";
import { PartialApplication } from "./PartialApplication";
import type CategoryChannel from "./CategoryChannel";
import type {
	AnyGuildChannel,
	AnyThreadChannel,
	InviteChannel,
	InviteStageInstance,
	PartialInviteChannel,
	RawInvite,
	RawInviteWithMetadata
} from "../types/channels";
import type Client from "../Client";
import type { InviteTargetTypes } from "../Constants";
import { ChannelTypes } from "../Constants";
import type { RawGuild, RawMember } from "../types/guilds";

// for the love of god find a way to make this not so shit
export type InviteInfoTypes = "withMetadata" | "withCounts" | "withoutCounts" | "withExpiration" | "withoutExpiration";
/** Represents an invite. */
export default class Invite<T extends InviteInfoTypes = "withMetadata", CH extends InviteChannel = InviteChannel> extends Base {
	private _createdAt?: Date;
	/** The approximate number of total members in the guild this invite leads to. */
	approximateMemberCount?: number;
	/** The approximate number of online members in the guild this invite leads to. */
	approximatePresenceCount?: number;
	/** The channel this invite leads to. */
	channel?: CH | PartialInviteChannel;
	/** The code of this invite. */
	code: string;
	/** The date at which this invite expires. */
	expiresAt?: T extends "withMetadata" | "withoutExpiration" ? never : Date;
	/** The guild this invite leads to. */
	guild?: Guild;
	/** The scheduled event associated with this invite. */
	guildScheduledEvent?: ScheduledEvent;
	/** The user that created this invite. */
	inviter?: User;
	/** The time after which this invite expires. */
	maxAge: T extends "withMetadata" ? number : never;
	/** The maximum number of times this invite can be used, */
	maxUses: T extends "withMetadata" ? number : never;
	/** @deprecated The stage instance in the invite this channel is for (deprecated). */
	stageInstance?: InviteStageInstance;
	/** The embedded application this invite will open. */
	targetApplication?: PartialApplication;
	/** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
	targetType?: InviteTargetTypes;
	/** The user whose stream to display for this voice channel stream invite. */
	targetUser?: User;
	/** If this invite only grants temporary membership. */
	temporary: T extends "withMetadata" ? boolean : never;
	/** The number of times this invite has been used. */
	uses: T extends "withMetadata" ? number : never;
	constructor(data: RawInvite | RawInviteWithMetadata, client: Client) {
		// technical constraint, easier to pretend `code` is an id rather than make id optional
		super(data.code, client);
		this.code = data.code;
		this.expiresAt = (!data.expires_at ? undefined : new Date(data.expires_at)) as never;
		this.targetType = data.target_type;
		this.update(data);
	}

	protected update(data: Partial<RawInvite> | Partial<RawInviteWithMetadata>) {
		if (data.approximate_member_count !== undefined) this.approximateMemberCount = data.approximate_member_count;
		if (data.approximate_presence_count !== undefined) this.approximatePresenceCount = data.approximate_presence_count;

		let guild: Guild | undefined;
		if (data.guild) {
			if (this._client.guilds.has(data.guild.id)) guild = this._client.guilds.update(data.guild as RawGuild);
			else guild = new Guild(data.guild as RawGuild, this._client);

			this.guild = guild;
		}

		let channel: Channel | PartialInviteChannel | undefined;
		if (data.channel) {
			channel = this._client.getChannel<Exclude<AnyGuildChannel, CategoryChannel | AnyThreadChannel>>(data.channel.id);
			if (channel && channel instanceof Channel) channel["update"](data.channel);
			else if (data.channel.type === ChannelTypes.GROUP_DM) channel = data.channel as PartialInviteChannel;
			else channel = Channel.from(data.channel, this._client);
			this.channel = channel as CH;
		}
		if (data.inviter) this.inviter = this._client.users.update(data.inviter);
		if (data.stage_instance) this.stageInstance = {
			members: data.stage_instance.members.map(m => {
				const member = m as RawMember & { id: string; };
				member.id = member.user!.id;
				return guild!.members.update(member, guild!.id);
			}),
			participantCount: data.stage_instance.participant_count,
			speakerCount:     data.stage_instance.speaker_count,
			topic:            data.stage_instance.topic
		};
		if (data.target_application !== undefined) this.targetApplication = new PartialApplication(data.target_application, this._client);
		if (data.guild_scheduled_event !== undefined) this.guildScheduledEvent = guild!.scheduledEvents.update(data.guild_scheduled_event);
		if (data.target_user !== undefined) this.targetUser = this._client.users.update(data.target_user);
		if ("created_at" in data) {
			if (data.created_at !== undefined) this._createdAt = new Date(data.created_at);
			if (data.uses !== undefined) this.uses = data.uses as never;
			if (data.max_uses !== undefined) this.maxUses = data.max_uses as never;
			if (data.max_age !== undefined) this.maxAge = data.max_age as never;
			if (data.temporary !== undefined) this.temporary = data.temporary as never;
		}
	}

	// @ts-expect-error Base has a `createdAt` getter
	override get createdAt(): T extends "withMetadata" ? Date : undefined { return this._createdAt as never; }

	/**
	 * Delete this invite.
	 *
	 * @param {String} [reason] - The reason for deleting this invite.
	 * @returns {Promise<Invite>}
	 */
	async deleteInvite(reason?: string) {
		return this._client.rest.channels.deleteInvite<CH>(this.code, reason);
	}
}