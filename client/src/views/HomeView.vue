<template>
	<div class="calendar">
		<Title />
		<div class="body">
			<div class="green body-list">
				<ul>
					<li>SUN</li>
					<li>MON</li>
					<li>TUE</li>
					<li>WED</li>
					<li>THU</li>
					<li>FRI</li>
					<li>SAT</li>
				</ul>
			</div>
			<Days />
		</div>
		<div class="footer">
			<p>Hope we can remember our memories forever.</p>
		</div>
	</div>
	<div class="action-btns" v-if="store.state.showCreateBtn">
		<LogoutBtn />
		<InfoBtn />
		<CreateBtn />
	</div>
</template>

<script setup lang="ts">
import 'vue-loading-overlay/dist/css/index.css';
import Days from '../components/Days.vue'
import Title from '../components/Title.vue'
import CreateBtn from '../components/CreateBtn.vue';
import LogoutBtn from '../components/LogoutBtn.vue';
import InfoBtn from '../components/InfoBtn.vue';
import { useStore } from "vuex";

const store = useStore();

</script>

<style scoped>

body>.title {
	letter-spacing: 5px;
	color: #255d6e;
	font-family: Arial, Helvetica, sans-serif;
}

.footer {
	margin-right: 1rem;
	letter-spacing: 2.5px;
	color: #255d6e;
	/* width: 65%; */
	display: flex;
	justify-content: flex-end;
}

.footer>p {
	font-size: 25px;
	font-family: 'Caveat', cursive;
	color: #53656d;
}

.calendar {
	width: 70%;
	/* height: 30rem; */
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	background-color: #8abae1;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	margin-top: 10px;
}

.action-btns {
	width: 100vw;
	position: fixed;
    bottom: 0;
	display: flex;
	justify-content: center;
}

.title {
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	margin: 5px;
}

.title a {
	text-decoration: none;
}

.title .text {
	margin: 0 50px;
}

.title .text h1 {
	margin: 5px;
}

.title .text h3 {
	margin: 5px;
}

.lightgrey {
	color: #a8a8a8;
}

.darkgrey {
	color: #255d6e;
}

.modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
}

.modal-date {
	font-family: 'Caveat', cursive;
}

.modal-content {
	position: relative;
	background-color: #e3e3e3;
	margin: 10% auto;
	padding: 20px;
	border: 1px solid #888;
	border-radius: 10px;
	width: 60%;
	animation-name: modalopen;
	animation-duration: 0.5s;
}

@media screen {
	.modal-content {
		max-height: 80vh;
		margin: 5% auto;
		padding: 10px;
	}
}

.close {
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: #000;
	text-decoration: none;
	cursor: pointer;
}

@keyframes modalopen {
	from {
		opacity: 0
	}

	to {
		opacity: 1
	}
}

@keyframes modalclose {
	from {
		opacity: 1
	}

	to {
		opacity: 0
	}
}

.modal.show {
	display: block;
}

.modal.hide {
	animation-name: modalclose;
	animation-duration: 10s;
	display: none;
}

.modal .image {
	width: 50%;
	height: 100%;
	margin: 0 auto;
}

.modal .image img {
	width: 100%;
	margin: 20px auto;
	border-radius: 10px;
}

.modal-content h1,
p,
span {
	font-family: Arial, Helvetica, sans-serif;
	color: #203139;
}

.modal-content h1 {
	letter-spacing: 2px;
}

.modal-content .modal-title {
	display: flex;
	justify-content: space-between;
}

.modal-content .modal-title span {
	align-self: flex-end;
	letter-spacing: 5px;
	margin-right: 10px;
}

@media (max-width: 768px) {
	.calendar {
		width: 95%;
		/* height: 35rem; */
		margin-top: 3rem;
	}

	.footer {
		letter-spacing: 0.5px;
	}

	.footer>p {
		font-size: 20px;
	}

	.modal-content {
		width: 80%;
		margin: 25% auto;
	}

	.body-list ul li {
		height: 55px;
	}

	.modal .image {
		width: 80%;
	}
}

@media (max-width: 414px) {
	.calendar {
		width: 95%;
		/* height: 40rem; */
		margin-top: 0.5rem;
	}
}

@media (min-width: 1200px) {
	.body-list ul li {
		background-size: 50%;
	}

	.modal .image {
		max-width: 25%;
	}
}

@media (min-width: 1024px) {
	#app {
		padding: 0.5rem;
	}
}</style>
