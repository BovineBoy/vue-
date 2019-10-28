/**
 *hash路由
 */

/*
class Routers {
	constructor() {
		// 储存hash与callback键值对
		this.routes = {};
		// 当前hash
		this.currentUrl = '';
		// 默认不是后退操作
		this.isBack = false;
		// 记录出现过的hash
		this.history = [];
		// 作为指针默认指向this.history的末尾，根据后退前进指向history中不同的hash
		this.currentIndex = this.history.length - 1;
		this.refresh = this.refresh.bind(this);
		this.backOff = this.backOff.bind(this);
		window.addEventListener('load', this.refresh, false);
		window.addEventListener('hashchange', this.refresh, false);
	}
	// 将path路径和对应的callback函数储存
	route(path, callback) {
		this.routes[path] = callback || function() {};
	}
	// 刷新
	refresh() {
		// 获取当前URL中的hash路径
		this.currentUrl = location.hash.slice(1) || '/';
		if (!this.isBack) {
			// 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
			// 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
			// 避免再次造成指针的不匹配,我们直接截取指针之前的数组
			// 此操作同时与浏览器自带后退功能的行为保持一致
			if (this.currentIndex < this.history.length - 1)
				this.history = this.history.slice(0, this.currentIndex + 1);
			// 将当前hash路由推入数组存储
			this.history.push(this.currentUrl);
			// 指针向前移动
			this.currentIndex++;
		}
		// 执行当前hash路径的callback函数
		this.routes[this.currentUrl]();
		this.isBack = false;
	}
	// 后退功能
	backOff() {
		this.isBack = true;
		// 如果指针小于0的话不存在对应路由，因此锁定指针为0
		this.currentIndex <= 0 ? (this.currentIndex = 0) : (this.currentIndex = this.currentIndex - 1);
		// 随着后退，location.hash值也应随着变化
		location.hash = `#${this.history[this.currentIndex]}`;
		// 执行指针目前指向hash路由对应的callback
		this.routes[this.history[this.currentIndex]]();
	}
}
*/

/**
 * history路由
 */
class Routers {
	constructor() {
		this.routes = {};
		this._bindPopState();
	}
	init(path) {
		history.replaceState({ path: path }, null, path);
		this.routes[path] && this.routes[path]();
	}
	route(path, callback) {
		this.routes[path] = callback || function() {};
	}
	go(path) {
		history.pushState({ path: path }, null, path);
		this.routes[path] && this.routes[path]();
	}
	_bindPopState() {
		window.addEventListener('popstate', e => {
			const path = e.state && e.state.path;
			this.routes[path] && this.routes[path]();
		});
	}
}
