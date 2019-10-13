/**
 * 简易版双向绑定：劫持data对象属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。
 * 缺点：
 * 1. 每次增加一个新的属性我们就要对这个新属性进行监听
 * 2. 违反开放封闭原则
 * 3. 代码耦合严重
 */
/**
const data = {
	inputVal: "",
	name: ""
}

var inputs = document.getElementsByTagName("input")
var span = document.getElementsByTagName("span")[0]

Array.from(inputs).forEach(item => {
	item.addEventListener("input", e => {
		data.inputVal = e.target.value
		data.name = e.target.value
	})
})

Object.keys(data).forEach(function(key) {
	Object.defineProperty(data, key, {
		get: function() {
			console.log(key)
		},
		set: function(val) {
			if (key === "name") span.innerText = val
			if (key === "inputVal") inputs[0].value = inputs[1].value = val
		}
	})
})
*/
