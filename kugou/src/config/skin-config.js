let commom_1 = '/res/drawable-xhdpi-v4';
let commom_2 = '/res/drawable-xxhdpi-v4';
let skin_config = {
	selected: 0,
	skins: ['elk', 'christmaseve', 'starrysky', 'cat', 'cute', 'sloth']
}
let dir = `static/skins/${skin_config.skins[skin_config.selected]}${commom_1}`;
let skin = {
	bg: `${dir}/skin_main_bg.png`,
	avatar: `static/skins/avatar.jpg`,
	top_icons: [{
		icons: [`${dir}/skin_kg_comm_ic_main_top_ting_off.png`, `${dir}/skin_kg_comm_ic_main_top_ting_on.png`],
		selected: 1
	}, {
		icons: [`${dir}/skin_kg_comm_ic_main_top_kan_off.png`, `${dir}/skin_kg_comm_ic_main_top_kan_on.png`],
		selected: 0
	}, {
		icons: [`${dir}/skin_kg_comm_ic_main_top_chang_off.png`, `${dir}/skin_kg_comm_ic_main_top_chang_on.png`],
		selected: 0
	}],
	icon_search: {
		icons: [`${dir}/skin_kg_comm_ic_main_top_search_normal.png`, `${dir}/skin_kg_comm_ic_main_top_search_pressed.png`],
		selected: 0
	},
	top_action_icons: [{
		icons: [`${dir}/skin_kg_navigation_fav_normal.png`, `${dir}/skin_kg_navigation_fav_pressed.png`],
		selected: 0,
		text: '我喜欢',
	}, {
		icons: [`${dir}/skin_kg_navigation_playlist_normal.png`, `${dir}/skin_kg_navigation_playlist_pressed.png`],
		selected: 0,
		text: '歌单',
	}, {
		icons: [`${dir}/skin_kg_navigation_download_normal.png`, `${dir}/skin_kg_navigation_download_pressed.png`],
		selected: 0,
		text: '下载',
	}, {
		icons: [`${dir}/skin_kg_navigation_recent_normal.png`, `${dir}/skin_kg_navigation_recent_pressed.png`],
		selected: 0,
		text: '最近',
	}],
	phone: `${dir}/skin_kg_navigation_local_music_normal.png`,
	play: {
		icons: [`${dir}/skin_kg_navigation_random_normal.png`, `${dir}/skin_kg_navigation_random_pressed.png`],
		selected: 0
	},
	center_nav_icons: [{
		icons: [`${dir}/skin_kg_navigation_yueku_normal.png`, `${dir}/skin_kg_navigation_yueku_pressed.png`],
		selected: 0,
		text: '乐库',
	}, {
		icons: [`${dir}/skin_kg_navigation_channel_normal.png`, `${dir}/skin_kg_navigation_channel_pressed.png`],
		selected: 0,
		text: '电台',
	}, {
		icons: [`${dir}/skin_kg_navigation_kuchat_normal.png`, `${dir}/skin_kg_navigation_kuchat_pressed.png`],
		selected: 0,
		text: '酷群',
	}],
	earphone: `${dir}/skin_kg_navigation_tool.png`,
	game: `${dir}/skin_kg_navigation_game.png`,
	generalize: `${dir}/skin_kg_navigation_spread.png`,
	play_bg: `${dir}/skin_kg_playing_bar_right_bg.png`,
	singer_default_play_bg: `${dir}/skin_kg_playing_bar_default_avatar.png`,
	controll_play_icons: {
		icons: [`${dir}/skin_kg_ic_playing_bar_play_default.png`, `${dir}/skin_kg_ic_playing_bar_play_pressed.png`],
		selected: 0
	},
	controll_stop_icons: {
		icons: [`${dir}/skin_kg_ic_playing_bar_pause_default.png`, `${dir}/skin_kg_ic_playing_bar_pause_pressed.png`],
		selected: 0
	},
	next_icons: {
		icons: [`${dir}/skin_kg_ic_playing_bar_next_default.png`, `${dir}/skin_kg_ic_playing_bar_next_pressed.png`],
		selected: 0
	},
	song_list_icons: {
		icons: [`${dir}/skin_kg_ic_playing_bar_playlist_queue_default.png`, `${dir}/skin_kg_ic_playing_bar_playlist_queue_pressed.png`],
		selected: 0
	}
}

module.exports = skin;