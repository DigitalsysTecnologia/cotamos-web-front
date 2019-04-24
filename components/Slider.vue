<script>
/*
Usage: define this object inside component data opbejct
    slider: [{
        img: 'https://images.unsplash.com/photo-1551970353-3960cb854a2b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=950&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        _id: 0
      },{
        img: 'https://images.unsplash.com/photo-1553316025-482594611fef?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=950&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        _id: 1
      },{
        img: 'https://images.unsplash.com/photo-1552155677-48b570b1d34c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=950&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        _id: 2
      },{
        img: 'https://images.unsplash.com/photo-1552006827-c1c729aab145?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=950&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        _id: 3
      }]

Import and call the Slider component 

    <Slider v-bind:imgs="slider" v-bind:autoPlay="true"/>

*/
export default {
	name: 'Slider',
	data () {
		return {
			index: 0
		}
	},
	methods: {
		next () {
			this.index === this.imgs.length - 1 ? this.index = 0 : this.index++;
		},
		back () {
			this.index === 0 ? this.index = this.imgs.length - 1 : this.index--;
		},
		autoSlide () {
			setInterval(() => {
				this.next()
			}, 5000)
		}
	},
	mounted () {
		if (this.autoPlay)
			this.autoSlide()
	},
	props: {
		imgs: Array,
		autoPlay: Boolean
	}
}
</script>
<template>
	<div class="slider-wrapper" v-bind:style="{ backgroundImage: 'url(' + this.imgs[this.index].img + ')' }">
		<div class="slider--controls">
			<i @click="this.back" class="fas fa-3x fa-arrow-left"></i>
			<i @click="this.next" class="fas fa-3x fa-arrow-right"></i>
			<div class="dots--container">
        		<span v-for="(dot, i) in this.imgs.length" :key="i" class="dot"></span>
    		</div>
		</div>
	</div>
</template>
<style scoped>
.slider-wrapper {
	width: 950px;
	height: 400px;
	background-color: #333;
	color: #fff;
}
.slider--controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: inherit;
	padding: 0 1rem;
	position: relative;
}

.slider--controls i {
	cursor: pointer;
}

.dots--container {
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	width: 100%;
}
.dot {
	height: 7px;
	width: 7px;
	margin: 5px;
	background-color: #fff;
	border-radius: 50%;
	display: inline-block;
}

@media only screen and (max-width: 768px) {

	.dots--container {
		width: 100%;
	}
}
</style>
