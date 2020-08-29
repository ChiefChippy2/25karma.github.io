import React, { memo } from 'react';
import { Accordion, Box, HorizontalLine, StatCell, 
	StatPair, StatTable, StatTitle } from 'components';
import { ARCADE as consts } from 'constants/hypixel';
import { useHypixelContext } from 'hooks';
import * as Utils from 'utils';

/*
* Stats accordion for Arcade Games
*
* @param {number} props.index 	The order in which to display the row (used by react-beautiful-dnd)
*/
export const Arcade = memo((props) => {

	// The player's API data for Arcade Games
	const { player } = useHypixelContext();
	const json = Utils.traverse(player,'stats.Arcade') || {};
	
	const totalWins = Object.entries(json)
		// The point of substring() is to filter out 'prop_hunt_hider_wins_hide_and_seek' from the
		// total wins since it is a duplicate of 'hider_wins_hide_and_seek' (same for seekers)
		.map(e => e[0].substring(0,16).includes('wins_') ? e[1] : 0)
		.reduce((a, b) => a + b, 0);
	
	const header = (
		<Box title="Wins">{totalWins}</Box>
		);

	const zombiesMapTable = (
		<StatTable>
			<thead>
				<tr>
					<th>Map</th>
					<th>Downs</th>
					<th>Revives</th>
					<th>Doors Opened</th>
					<th>Windows Repaired</th>
					<th>Zombies Killed</th>
					<th>Deaths</th>
					<th>Best Round</th>
				</tr>
			</thead>
			<tbody>
			{
				consts.ZOMBIESMODES.map(({id, name, color}) => 
					Boolean(json[`best_round_zombies_${id}`]) &&
					<tr key={id}>
						<StatCell color={color}>{name}</StatCell>
						<StatCell>{json[`times_knocked_down_zombies_${id}`]}</StatCell>
						<StatCell>{json[`players_revived_zombies_${id}`]}</StatCell>
						<StatCell>{json[`doors_opened_zombies_${id}`]}</StatCell>
						<StatCell>{json[`windows_repaired_zombies_${id}`]}</StatCell>
						<StatCell>{json[`zombie_kills_zombies_${id}`]}</StatCell>
						<StatCell>{json[`deaths_zombies_${id}`]}</StatCell>
						<StatCell>{json[`best_round_zombies_${id}`]}</StatCell>
					</tr>
					)
			}
			</tbody>
		</StatTable>
		);

	const zombiesTypeTable = (
		<StatTable>
			<thead>
				<tr>
					<th>Zombie</th>
					<th>Kills</th>
				</tr>
			</thead>
			<tbody>
			{
				consts.ZOMBIESTYPES.map(mode => 
					json[`${mode.id}_zombie_kills_zombies`] &&
					<tr key={mode.id}>
						<StatCell color={mode.color}>{mode.name}</StatCell>
						<StatCell>{json[`${mode.id}_zombie_kills_zombies`]}</StatCell>
					</tr>
					)
			}
			</tbody>
		</StatTable>
		);

	return Utils.isEmpty(json) ? 
		<Accordion title={consts.TITLE} index={props.index} />
		:
		<Accordion title={consts.TITLE} header={header} index={props.index}>
			<div className="my-3">
				<StatPair title="Arcade Coins" color="gold">{json.coins}</StatPair>
			</div>
			<div className="h-flex mb-3">
				<div className="flex-1">
					<div className="font-bold underline mb-1">Blocking Dead</div>
					<StatPair title="Wins">{json.wins_dayone}</StatPair>
					<StatPair title="Kills">{json.kills_dayone}</StatPair>
					<StatPair title="Headshots">{json.headshots_dayone}</StatPair>
					<StatPair title="Melee Weapon">
						{Utils.capitalize((json.melee_weapon || '-').split('_').join(' '))}
					</StatPair>
					<br />
					<div className="font-bold underline mb-1">Bounty Hunters</div>
					<StatPair title="Wins">{json.wins_oneinthequiver}</StatPair>
					<StatPair title="Kills">{json.kills_oneinthequiver}</StatPair>
					<StatPair title="Deaths">{json.deaths_oneinthequiver}</StatPair>
					<StatPair title="Kill/Death Ratio">{Utils.ratio(json.kills_oneinthequiver, json.deaths_oneinthequiver)}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Creeper Attack</div>
					<StatPair title="Max Wave">{json.max_wave}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Dragon Wars</div>
					<StatPair title="Wins">{json.wins_dragonwars2}</StatPair>
					<StatPair title="Kills">{json.kills_dragonwars2}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Easter Simulator</div>
					<StatPair title="Wins">{json.wins_easter_simulator}</StatPair>
					<StatPair title="Eggs Found">{json.eggs_found_easter_simulator}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Ender Spleef</div>
					<StatPair title="Wins">{json.wins_ender}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Farm Hunt</div>
					<StatPair title="Wins">{json.wins_farm_hunt}</StatPair>
					<StatPair title="Poop Collected">{json.poop_collected}</StatPair>
				</div>
				<div className="flex-1">
					<div className="font-bold underline mb-1">Football</div>
					<StatPair title="Wins">{json.wins_soccer}</StatPair>
					<StatPair title="Goals">{json.goals_soccer}</StatPair>
					<StatPair title="Kicks">{json.kicks_soccer}</StatPair>
					<StatPair title="Powerkicks">{json.powerkicks_soccer}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Galaxy Wars</div>
					<StatPair title="Wins">{json.sw_game_wins}</StatPair>
					<StatPair title="Kills">{json.sw_kills}</StatPair>
					<StatPair title="Empire Kills">{json.sw_empire_kills}</StatPair>
					<StatPair title="Rebel Kills">{json.sw_rebel_kills}</StatPair>
					<StatPair title="Deaths">{json.sw_deaths}</StatPair>
					<StatPair title="Kill/Death Ratio">{Utils.ratio(json.sw_wins, json.sw_deaths)}</StatPair>
					<StatPair title="Shots Fired">{json.sw_shots_fired}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Grinch Simulator</div>
					<StatPair title="Wins">{json.wins_grinch}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Hide and Seek</div>
					<StatPair title="Wins as Seeker">{json.seeker_wins_hide_and_seek}</StatPair>
					<StatPair title="Wins as Hider">{json.hider_wins_hide_and_seek}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Hole in the Wall</div>
					<StatPair title="Wins">{json.wins_hole_in_the_wall}</StatPair>
					<StatPair title="Highest Score Qualifications">{json.hitw_record_q}</StatPair>
					<StatPair title="Highest Score Finals">{json.hitw_record_f}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Hypixel Says</div>
					<StatPair title="Wins">{json.wins_simon_says}</StatPair>
					<StatPair title="Rounds">{json.rounds_simon_says}</StatPair>
				</div>
				<div className="flex-1">
					<div className="font-bold underline mb-1">Party Games 1</div>
					<StatPair title="Wins">{json.wins_party}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Party Games 2</div>
					<StatPair title="Wins">{json.wins_party_2}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Party Games 3</div>
					<StatPair title="Wins">{json.wins_party_3}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Pixel Painters</div>
					<StatPair title="Wins">{json.wins_draw_their_thing}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Santa Says</div>
					<StatPair title="Wins">{json.wins_santa_says}</StatPair>
					<StatPair title="Rounds">{json.rounds_santa_says}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Santa Simulator</div>
					<StatPair title="Presents Delivered">{json.delivered_santa_simulator}</StatPair>
					<StatPair title="Times Spotted">{json.spotted_santa_simulator}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Scuba Simulator</div>
					<StatPair title="Wins">{json.wins_scuba_simulator}</StatPair>
					<StatPair title="Items Found">{json.items_found_scuba_simulator}</StatPair>
					<StatPair title="Total Points">{json.total_points_scuba_simulator}</StatPair>
					<br />
					<div className="font-bold underline mb-1">Throw Out</div>
					<StatPair title="Wins">{json.wins_throw_out}</StatPair>
					<StatPair title="Kills">{json.kills_throw_out}</StatPair>
					<StatPair title="Deaths">{json.deaths_throw_out}</StatPair>
					<StatPair title="Kill/Death Ratio">{Utils.ratio(json.kills_throw_out, json.deaths_throw_out)}</StatPair>
				</div>
			</div>

			<HorizontalLine />

			<StatTitle>Mini Walls</StatTitle>
			<div className="h-flex mb-3">
				<div className="flex-1">
					<StatPair title="Wins">{json.wins_mini_walls}</StatPair>
					<StatPair title="Kit">{Utils.capitalize(json.miniwalls_activeKit || '-')}</StatPair>
					<StatPair title="Withers Killed">{json.wither_kills_mini_walls}</StatPair>
				</div>
				<div className="flex-1">
					<StatPair title="Kills">{json.kills_mini_walls}</StatPair>
					<StatPair title="Final Kills">{json.final_kills_mini_walls}</StatPair>
					<StatPair title="Deaths">{json.deaths_mini_walls}</StatPair>
					<StatPair title="Kill/Death Ratio">
						{Utils.ratio(json.kills_mini_walls/json.deaths_mini_walls)
							+Utils.ratio(json.final_kills_mini_walls/json.deaths_mini_walls)}
					</StatPair>
				</div>
				<div className="flex-1">
					<StatPair title="Arrows Hit">{json.arrows_hit_mini_walls}</StatPair>
					<StatPair title="Arrows Shot">{json.arrows_shot_mini_walls}</StatPair>
					<StatPair title="Arrow Hit Accuracy">{Utils.ratio(json.arrows_hit_mini_walls, json.arrows_shot_mini_walls)}</StatPair>
				</div>
			</div>

			<HorizontalLine />

			<StatTitle>Zombies</StatTitle>
			<div className="h-flex mb-2">
				<div className="flex-1">
					<StatPair title="Bullets Hit">{json.bullets_hit_zombies}</StatPair>
					<StatPair title="Bullets Shot">{json.bullets_shot_zombies}</StatPair>
					<StatPair title="Bullet Hit Accuracy" percentage>{Utils.ratio(json.bullets_hit_zombies, json.bullets_shot_zombies)}</StatPair>
					<StatPair title="Headshots">{json.headshots_zombies}</StatPair>
					<StatPair title="Headshot Accuracy" percentage>{Utils.ratio(json.headshots_zombies, json.bullets_hit_zombies)}</StatPair>
				</div>
				<div className="flex-1">
					<StatPair title="Times Knocked Down">{json.times_knocked_down_zombies}</StatPair>
					<StatPair title="Players Revived">{json.players_revived_zombies}</StatPair>
					<StatPair title="Doors Opened">{json.doors_opened_zombies}</StatPair>
					<StatPair title="Windows Repaired">{json.windows_repaired_zombies}</StatPair>
					<StatPair title="Zombies Killed">{json.zombie_kills_zombies}</StatPair>
				</div>
			</div>
			<div className="overflow-x mb-2">
				{zombiesMapTable}
			</div>
			<div className="overflow-x mb-3" style={{width: '50%'}}>
				{zombiesTypeTable}
			</div>
		</Accordion>
});