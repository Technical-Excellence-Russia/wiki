# Инверсия Контроля (IoC) [draft]

Перевод статьи на русский язык Мартина Фаулера [InversionOfControl](https://martinfowler.com/bliki/InversionOfControl.html)

**Инверсия Контроля (англ. Inversion of Control, IoC)** - распространенное явление, с которым вы сталкиваетесь при расширении фреймворков. На самом деле оно часто рассматривается как определяющая характеристика фреймворка.

Приведём простой пример. Представьте, что я пишу программу, чтобы получить некоторую информацию от пользователя через командную строку. Я мог бы это сделать так:

```ruby
puts 'What is your name?'
name = gets
process_name(name)
puts 'What is your quest?'
quest = gets
process_quest(quest)
```

В этом взаимодействии мой код всем управляет: он решает, когда задавать вопросы, читать ответы и обрабатывать эти результаты.

Однако если бы я использовал оконный графический интерфейс, чтобы сделать что-то подобное, я бы начал с конфигурации объекта ```Window```.

```ruby
require 'tk'
root = TkRoot.new()
name_label = TkLabel.new() {text "What is Your Name?"}
name_label.pack
name = TkEntry.new(root).pack
name.bind("FocusOut") {process_name(name)}
quest_label = TkLabel.new() {text "What is Your Quest?"}
quest_label.pack
quest = TkEntry.new(root).pack
quest.bind("FocusOut") {process_quest(quest)}
Tk.mainloop()
```

Эти примеры значительно отличаются потоками управления между - в частности, когда ```process_name``` и ```process_quest``` методы будут вызваны. В первой программе я контролирую, когда эти методы будут вызваны, но во втором случае я этого не делаю. Вместо этого я управляю оконной подсистемой (с помощью команды ```Tk.mainloop```). А уже потом она решает, когда вызвать мои методы, основываясь на привязках, которые я сделал при создании формы. Контроль инвертирован — фреймворк вызывает меня, а не я его. Это явление называется Инверсией Контроля (также известное, как Голливудский принцип - "Не звоните нам, мы сами вам позвоним").

> Одной из важных характеристик фреймворка является то, что методы, определенные пользователем при использовании фреймворка, часто будут вызываться из самого фреймворка, а не из кода приложения пользователя. Фреймворк часто играет роль основной программы в координации и определении последовательности действий приложения. Эта инверсия контроля дает фреймворкам возможность становиться расширяемыми. Методы, предоставляемые пользователем, применяют общие алгоритмы, определенные в структуре для конкретного приложения.
> -- Ральф Джонсон и Брайан Фут.

Инверсия Контроля — ключевое отличие фреймворк от библиотеки. Библиотека — это, по сути, набор функций, которые вы можете вызывать. В наши дни обычно организованные в классы и пакеты. Каждый вызов выполняет некоторую работу и возвращает управление клиенту.

Фреймворк воплощает в себе некий абстрактный дизайн с бóльшим набором встроенного поведения. Чтобы использовать его, вам нужно вставить своё поведение в некоторых местах фреймворка путем создания подклассов, либо путем подключения ваших собственных классов. Затем код фреймворка вызовет ваш код в этих точках.

Есть несколько способов, которыми вы можете подключить свой код для вызова. В приведенном выше примере с Ruby мы вызываем метод привязки к полю ввода текста, который передает имя события и лямбда-выражение в качестве аргумента. Каждый раз, когда поле ввода текста обнаруживает событие, оно вызывает код это лямбда-выражение. Использование подобных выражений очень удобно, но многие языки их не поддерживают.

Другой способ сделать это — указать фреймворку на события, а клиентскому коду подписаться на эти события. dotNET - хороший пример платформы, которая имеет встроенные методы, позволяющие людям объявлять события в виджетах. Затем вы можете привязать метод к событию с помощью делегата.

Вышеупомянутые подходы (они действительно одинаковы) хорошо работают для отдельных случаев, но иногда вы хотите объединить несколько вызовов методов в одном модуле расширения. В этом случае фреймворк может предоставить интерфейс, который клиентский код должен реализовать для соответствующих вызовов.

EJB-компоненты<sup>[1](#footnote-1)<sup> - хороший пример этого стиля инверсии контроля. При разработке сессионного компонента (session bean) вы можете реализовать различные методы, которые вызываются контейнером EJB в различных точках жизненного цикла. Например, интерфейс ```Session Bean``` определяет ```ejbRemove```, ``ejbPassivate`` (сохраняется во вторичном хранилище) и ```ejbActivate``` (переходит в активное состояния). Вы не можете контролировать, когда вызываются эти методы, только то, что они делают. Контейнер звонит нам, а не мы ему.

Это сложные случаи инверсии контроля, но вы можете столкнуться с этим эффектом в гораздо более простых ситуациях. Хороший пример — шаблонный метод: суперкласс определяет поток управления, подклассы расширяют эти методы переопределения или реализуют абстрактные методы при расширении. Так, в JUnit<sup>[2](#footnote-2)<sup> код фреймворка вызывает методы ```setUp``` и ```tearDown```, чтобы вы могли создать и очистить фикстуру без лишнего кода. Он выполняет вызов, ваш код реагирует — поэтому снова управление инвертировано.

These are complicated cases of inversion of control, but you run into this effect in much simpler situations. A template method is a good example: the super-class defines the flow of control, subclasses extend this overriding methods or implementing abstract methods to do the extension. So in JUnit, the framework code calls setUp and tearDown methods for you to create and clean up your text fixture. It does the calling, your code reacts - so again control is inverted.

There is some confusion these days over the meaning of inversion of control due to the rise of IoC containers; some people confuse the general principle here with the specific styles of inversion of control (such as dependency injection) that these containers use. The name is somewhat confusing (and ironic) since IoC containers are generally regarded as a competitor to EJB, yet EJB uses inversion of control just as much (if not more).

Etymology: As far as I can tell, the term Inversion of Control first came to light in Johnson and Foote's paper Designing Reusable Classes, published by the Journal of Object-Oriented Programming in 1988. The paper is one of those that's aged well - it's well worth a read now over fifteen years later. They think they got the term from somewhere else, but can't remember what. The term then insinuated itself into the object-oriented community and appears in the Gang of Four book. The more colorful synonym 'Hollywood Principle' seems to originate in a paper by Richard Sweet on Mesa in 1983. In a list of design goals he writes: "Don't call us, we'll call you (Hollywood's Law): A tool should arrange for Tajo to notify it when the user wishes to communicate some event to the tool, rather than adopt an 'ask the user for a command and execute it' model." John Vlissides wrote a column for C++ report that provides a good explanation of the concept under the 'Hollywood Principle' moniker. (Thanks to Brian Foote and Ralph Johnson for helping me with the Etymology.)

## Заметки

1. <a name="footnote-1"></a> EJB (Enterprise Java Beans) - часть платформы Java EE. В года публикации статьи (2005) была прорывной технологией. Со временем уступила место более гибким и легковесным подходам, например Spring Framework и Google Guice.

2. <a name="footnote-2"></a> Пример приведён для JUnit версии 3 и ниже. В более поздних версиях появилась возможность вместо расширения класса ```TestCase``` использовать аннотация для методов. Что не меняет суть концепции.

Перевёл: [Кротов Артём](https://fb.com/artem.v.krotov).

Остались вопросы? Задавай в [нашем чате](https://t.me/technicalexcellenceru).
