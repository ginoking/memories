<template>
    <div class="title">
        <a @click.prevent="changeDates(false)">Previos</a>
        <div class="text">
            <h1 class="green" id="calendar-title">{{ monthTitle }}</h1>
            <h3 class="green small" id="calendar-year">{{ yearTitle }}</h3>
        </div>
        <a @click.prevent="changeDates(true)">Next</a>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useStore } from 'vuex'
import moment from 'moment'
import axiosInstance from '../axios/axios';

const store = useStore()
let currentDate = ref(`2021-12-01`);
let yearTitle = ref(formatDate('YYYY'));
let monthTitle = ref(formatDate('MMMM'));

const events: {
    [key: string]: {
        name: string,
        des: string,
        image: string
    }
} = {
		'2022-01-23': {
			'name': '新竹海邊遊',
			'des': '我們一起去海邊走走逛逛，雖然最後飄雨，但是心暖暖的',
			'image': '../static/images/2022123.jpg'
		},
		'2022-02-5': {
			'name': '司馬庫斯櫻花行',
			'des': '第一次介紹朋友給你認識，其實蠻緊張的，很怕你會不喜歡他們，還好結果很讚',
			'image': '../static/images/202225.jpg'
		},
		'2022-02-22': {
			'name': '交往紀念日',
			'des': '這天因為你無心的一句話，讓我成功取得你的芳心',
			'image': ''
		},
		'2022-03-12': {
			'name': '高空彈跳',
			'des': '很謝謝你陪我做我想要做的事情～',
			'image': '../static/images/2022312.jpg'
		},
		'2022-03-25': {
			'name': '生日蛋糕',
			'des': '百忙之中抽空幫我買蛋糕，還自己偷偷騎到平鎮幫我慶生，謝謝～～',
			'image': '../static/images/2022325.png'
		},
		'2022-04-3': {
			'name': '阿里山行',
			'des': '總是有你幫我拍美美的照片，雖然我們在後面都很不舒服...',
			'image': '../static/images/202243.jpg'
		},
		'2022-04-11': {
			'name': '北德拉曼',
			'des': '第一次跟你一起爬山，也是第一次認識你的朋友，很好玩！',
			'image': '../static/images/2022411.jpg'
		},
		'2022-05-1': {
			'name': '大壩之旅',
			'des': '第一次的百岳，第一次跟你在外面過夜，好玩！',
			'image': '../static/images/202251.jpg'
		},
		'2022-05-11': {
			'name': '第一次敷面膜',
			'des': '想盡辦法讓我的臉變好',
			'image': '../static/images/2022511.jpg'
		},
		'2022-05-18': {
			'name': '李大廚準備美食',
			'des': '厲害的老婆總是煮好吃的給我吃',
			'image': '../static/images/2022518.jpg'
		},
		'2022-05-28': {
			'name': '你的吻',
			'des': '',
			'image': '../static/images/2022528.jpg'
		},
		'2022-05-29': {
			'name': '合歡石門',
			'des': '總是很希歡跟你去爬山',
			'image': '../static/images/2022529.jpg'
		},
		'2022-07-9': {
			'name': '巴陵鐵塔',
			'des': '第一次晚上載你騎這麼遠，不過看到星星應該值得',
			'image': '../static/images/202279.jpg'
		},
		'2022-07-15': {
			'name': '夏夕夏景',
			'des': '第一次跟你的家人吃飯，雖然沒有爸爸媽媽，但是還是有點緊張',
			'image': '../static/images/2022715.jpg'
		},
		'2022-8-13': {
			'name': '滑雪的寶貝',
			'des': '認真的女人最美麗',
			'image': '../static/images/2022813.jpg'
		},
		'2022-8-28': {
			'name': '武嶺行',
			'des': '陪我完成如此艱鉅的任務，雖然沒上到武嶺亭。下次一定可以！',
			'image': '../static/images/2022828.jpg'
		},
		'2022-9-4': {
			'name': '泳渡日月潭',
			'des': '我們真的很厲害，在颱風天完成這項壯舉！',
			'image': '../static/images/202294.jpg'
		},
		'2022-9-30': {
			'name': '興南公演',
			'des': '算是陪我回娘家？雖然讓你有點尷尬，但是我一定會改進的！',
			'image': '../static/images/2022930.jpg'
		},
		'2022-10-28': {
			'name': '萬聖節',
			'des': '最可愛的無臉男',
			'image': '../static/images/20221028.jpg'
		},
		'2022-11-20': {
			'name': '宜蘭小旅行',
			'des': '感謝厲害的老婆當司機，我們要走遍全世界',
			'image': '../static/images/20221120.jpg'
		},
		'2022-12-11': {
			'name': '尖石露營',
			'des': '懶懶懶的露營，好吃好玩好睡',
			'image': '../static/images/20221211.jpg'
		},
		'2022-12-24': {
			'name': '聖誕大餐',
			'des': '終於吃到心心念念的小舊閣樓ＸＤ',
			'image': '../static/images/20221224.jpg'
		},
		'2023-2-11': {
			'name': '歐萊德春酒',
			'des': '最美里的春酒主持，完成任務～',
			'image': '../static/images/2023211.jpg'
		},
	};

changeDates(true);

function changeDates(next: boolean): void { 
	console.log(axiosInstance.get('/'));
	
    const containEventDays : Array<object> = [];
    const newMoment = next ? moment(currentDate.value).add(1, "M") : moment(currentDate.value).subtract(1, "M");
    currentDate.value = newMoment.format('YYYY-MM-DD').toString();
    yearTitle.value = formatDate('YYYY')
    monthTitle.value = formatDate('MMMM')
    
    const emptyArray: string[] = Array.from({ length: moment(currentDate.value).day() }, () => "");
    const numberArray: string[] = Array.from({ length: moment(currentDate.value).daysInMonth() }, (_, i) => (i+1).toString());
    
    emptyArray.concat(numberArray).map((number: string) => {                
        containEventDays.push({ 
            date: number,
            event: events[`${formatDate('YYYY')}-${formatDate('MM')}-${number}`] 
        });
    })
    
    store.commit('setDays', containEventDays)    
}

function formatDate(format: string) : string {
    return moment(currentDate.value).format(format) 
}
</script>
<style scoped>
    .title a {
        cursor: pointer;
    }
</style>
