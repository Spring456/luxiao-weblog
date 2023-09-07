(window.webpackJsonp=window.webpackJsonp||[]).push([[204],{744:function(n,t,a){"use strict";a.r(t);var e=a(2),s=Object(e.a)({},(function(){var n=this,t=n._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h2",{attrs:{id:"理解js中的面向对象编程-3-继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#理解js中的面向对象编程-3-继承"}},[n._v("#")]),n._v(" 理解JS中的面向对象编程(3)——继承")]),n._v(" "),t("h3",{attrs:{id:"什么是继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是继承"}},[n._v("#")]),n._v(" 什么是继承？")]),n._v(" "),t("p",[n._v("继承，在js中就是子类继承父类，可以使用父类的属性和方法")]),n._v(" "),t("h3",{attrs:{id:"js继承有什么作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#js继承有什么作用"}},[n._v("#")]),n._v(" js继承有什么作用")]),n._v(" "),t("p",[n._v("1、可以根据父类的构造方法创造新的实例")]),n._v(" "),t("p",[n._v("2、修改父类的属性或方法可以同步到其所有的子类")]),n._v(" "),t("h3",{attrs:{id:"js继承的方式及优缺点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#js继承的方式及优缺点"}},[n._v("#")]),n._v(" JS继承的方式及优缺点")]),n._v(" "),t("p",[t("strong",[n._v("一、原型链继承")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Person(name,age){\n    this.age=18\n}\n\nPerson.prototype.getName = function(){\n    console.log(this.name);\n    console.log(this.age)\n}\n\nfunction Child(){\n    this.name = 'Hello world'\n}\n\nvar child2 = new Person()//父类的实例child2\n\nchild2.sex='男'//为实例child2添加sex属性\n\nchild2.prototype.age='22'\n\nChild.prototype = new Person();//子类的原型等于父类的实例\n\nvar child1 = new Child();//创建子类的实例对象\n\nchild1.getName(); // Hello world,18\n\nconsole.log(child1.sex)//undefined,实例对象child1没有sex这个属性，因此是undefined\n")])])]),t("p",[n._v("原型链继承关键点：新实例的原型等于父类的实例")]),n._v(" "),t("p",[n._v("优点：")]),n._v(" "),t("p",[n._v("1、实例可继承的属性有：实例的构造函数的属性(上面的name属性)，父类构造函数属性(上面age属性)，父类原型的属性。")]),n._v(" "),t("p",[n._v("2、新实例不会继承父类实例的属性。(上面子类实例child1不能继承父类实例child2的sex属性)")]),n._v(" "),t("p",[n._v("缺点：")]),n._v(" "),t("p",[n._v("1、新实例无法向父类构造函数传参。")]),n._v(" "),t("p",[n._v("2、继承单一")]),n._v(" "),t("p",[n._v("3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性 也会被修改！）")]),n._v(" "),t("p",[n._v("对于第3点，我们用案例来展现")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Person () {}\nPerson.prototype= {\n    name:['小明']\n}\n\nvar a = new Person()\nvar b = new Person()\na.name.push('小红')\nconsole.log(b.name)//[\"小明\", \"小红\"]\n")])])]),t("p",[n._v("从上面的代码可以得出，实例a修改了原型属性name，实例b的属性也相应改变了。如果使用a.name='小红'这种赋值操作,只是给对象实例添加了一个属性，并不是给原型添加属性，实例b就不会改变其属性。")]),n._v(" "),t("p",[t("strong",[n._v("二、构造函数继承")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('function Person(){\n    this.name = \'xiaoming\';\n    this.colors = [\'red\', \'blue\', \'green\'];\n}\n\nPerson.prototype.getName = function(){\n    console.log(this.name);\n}\n\nfunction Child(age){\n    Person.call(this);\n    this.age = age\n}\n\nvar child1 = new Child(23);\nvar child2 = new Child(12);\nchild1.colors.push(\'yellow\');\nconsole.log(child1.name); // xiaoming\nconsole.log(child1.colors); // ["red", "blue", "green", "yellow"]\nconsole.log(child2.colors); // ["red", "blue", "green"]\n')])])]),t("p",[n._v("重点：用.call()和.apply()将父类构造函数引入子类函数（在子类 函数中做了父类函数的自执行（复制））")]),n._v(" "),t("p",[n._v("优点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。\n　　　2、解决了原型链继承缺点1、2、3。\n　　　3、可以继承多个构造函数属性（call多个）。\n　　　4、在子实例中可向父实例传参。")]),n._v(" "),t("p",[n._v("缺点：1、只能继承父类构造函数的属性。\n　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）\n　　　3、每个新实例都有父类构造函数的副本，臃肿。")]),n._v(" "),t("p",[t("strong",[n._v("三、组合继承（组合原型链继承和借用构造函数继承）（常用）")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent(name){\n    this.name = name;\n    this.colors = ['red', 'blue', 'green'];\n}\n\nParent.prototype.getName = function(){\n    console.log(this.name);\n}\n\nfunction Child(name,age){\n    Parent.call(this,name);// 第二次调用 Parent()\n    this.age = age;\n}\n\nChild.prototype = new Parent(); // 第一次调用 Parent()\n\nvar child1 = new Child('xiaopao',18);\nvar child2 = new Child('lulu',19);\n")])])]),t("p",[n._v("重点：结合了两种模式的优点，传参和复用")]),n._v(" "),t("p",[n._v("优点：1、可以继承父类原型上的属性，可以传参，可复用。\n　　　2、每个新实例引入的构造函数属性是私有的。")]),n._v(" "),t("p",[n._v("缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。")]),n._v(" "),t("p",[t("strong",[n._v("四、原型式继承")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('function CreateObj(o){\n    function F(){}\n    F.prototype = o;\n    console.log(o.__proto__ === Object.prototype);\n    console.log(F.prototype.constructor === Object); // true\n    return new F();\n}\n\nvar person = {\n    name: \'xiaopao\',\n    friend: [\'daisy\',\'kelly\']\n}\n\nvar person1 = CreateObj(person);\n\n// var person2 = CreateObj(person);\n\nperson1.name = \'person1\';\n// console.log(person2.name); // xiaopao\nperson1.friend.push(\'taylor\');\n// console.log(person2.friend); // ["daisy", "kelly", "taylor"]\n// console.log(person); // {name: "xiaopao", friend: Array(3)}\nperson1.friend = [\'lulu\'];\n// console.log(person1.friend); // ["lulu"]\n// console.log(person.friend); //  ["daisy", "kelly", "taylor"]\n// 注意： 这里修改了person1.name的值，person2.name的值并未改变，并不是因为person1和person2有独立的name值，而是person1.name=\'person1\'是给person1添加了name值，并非修改了原型上的name值\n// 因为我们找对象上的属性时，总是先找实例上对象，没有找到的话再去原型对象上的属性。实例对象和原型对象上如果有同名属性，总是先取实例对象上的值\n')])])]),t("p",[n._v("重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。")]),n._v(" "),t("p",[n._v("优点：类似于复制一个对象，用函数来包装。")]),n._v(" "),t("p",[n._v("缺点：1、所有实例都会继承原型上的属性。\n　　　2、无法实现复用。（新实例属性都是后面添加的）")]),n._v(" "),t("p",[t("strong",[n._v("五、寄生式继承")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("var ob = {\n    name: 'xiaopao',\n    friends: ['lulu','huahua']\n}\n\nfunction CreateObj(o){\n    function F(){};  // 创建一个构造函数F\n    F.prototype = o;\n    return new F();\n}\n\n// 上面CreateObj函数 在ECMAScript5 有了一新的规范写法，Object.create(ob) 效果是一样的 , 看下面代码\nvar ob1 = CreateObj(ob);\nvar ob2 = Object.create(ob);\nconsole.log(ob1.name); // xiaopao\nconsole.log(ob2.name); // xiaopao\n\nfunction CreateChild(o){\n    var newob = CreateObj(o); // 创建对象 或者用 var newob = Object.create(ob)\n    newob.sayName = function(){ // 增强对象\n        console.log(this.name);\n    }\n    return newob; // 指定对象\n}\n\nvar p1 = CreateChild(ob);\np1.sayName(); // xiaopao \n")])])]),t("p",[n._v("重点：就是给原型式继承外面套了个壳子。")]),n._v(" "),t("p",[n._v("优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。")]),n._v(" "),t("p",[n._v("缺点：没用到原型，无法复用。")]),n._v(" "),t("p",[t("strong",[n._v("六、寄生组合式继承（常用）")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("function Parent(name){\n    this.name = name;\n    this.colors = ['red', 'blue', 'green'];\n}\n\nParent.prototype.sayName = function(){\n    console.log(this.name);\n}\n\nfunction Child(name,age){\n    Parent.call(this,name); \n    this.age = age;\n}\n\nfunction CreateObj(o){\n    function F(){};\n    F.prototype = o;\n    return new F();\n}\n\n// Child.prototype = new Parent(); // 这里换成下面\nfunction prototype(child,parent){\n    var prototype = CreateObj(parent.prototype);\n    prototype.constructor = child;\n    child.prototype = prototype;\n}\nprototype(Child,Parent);\n\nvar child1 = new Child('xiaopao', 18);\nconsole.log(child1); \n")])])]),t("p",[n._v("重点：修复了组合继承的问题")]),n._v(" "),t("p",[t("strong",[n._v("七、class继承")])]),n._v(" "),t("p",[n._v("es6提供了类的概念，可以用来继承")]),n._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("class")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Parent5")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[n._v("constructor")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(".")]),n._v("name "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[n._v("'super5'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("]")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[n._v("reName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(".")]),n._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[n._v("push")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[n._v("'new 5'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("class")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Child5")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("extends")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Parent5")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[n._v("constructor")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("{")]),n._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("super")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("}")]),n._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("var")]),n._v(" child51 "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("new")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Child5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("var")]),n._v(" child52 "),t("span",{pre:!0,attrs:{class:"token operator"}},[n._v("=")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[n._v("new")]),n._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[n._v("Child5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[n._v(")")]),n._v("\n")])])]),t("p",[n._v("推荐文章：\n"),t("a",{attrs:{href:"https://github.com/mqyqingfeng/Blog/issues/16",target:"_blank",rel:"noopener noreferrer"}},[n._v("JavaScript 深入之继承的多种方式和优缺点"),t("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=s.exports}}]);