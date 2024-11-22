# Принцип открытости/закрытости (OCP)

Оригинальный текст из книги Робертом Мартина [Agile Principles, Patterns, and Practices](https://www.amazon.com/Agile-Principles-Patterns-Practices-C/dp/0131857258).

[Айвар Джекобсон](https://www.amazon.com/Object-Oriented-Software-Engineering-Approach/dp/0201544350) говорил: "Любая система на протяжении своего жизненного цикла претерпевает изменения. Об этом следует помнить, разрабатывая систему, которая предположительно переживет первую версию". Как создавать системы, которые сохраняли бы стабильность перед  лицом изменений и просуществовали бы дольше первой версии? Направление указал [Бертран Мейер](https://www.amazon.com/Object-Oriented-Software-Construction-Prentice-Hall-International/dp/0136290493), который еще в 1988 году сформулировал ставший ныне знаменитым принцип открытости/закрытости. Вот как он звучит в слегка перефразированном виде:

---
**Принцип открытости/закрытости (Open/Closed Principle – OCP).**

*Программные сущности (классы, модули, функции и т. п.) должны быть открыты для расширения, но закрыты для модификации.*

---

Если единственное изменение в каком-то месте программы приводит к каскаду изменений в зависимых модулях, то дизайн попахивает жесткостью. Принцип OCP рекомендует переработать систему так, чтобы в будущем аналогичные изменения можно было реализовать путем добавления нового кода, а не изменения уже работающего. На первый
взгляд это кажется недостижимым идеалом, но существуют относительно простые и эффективные способы приблизиться к нему.

## Описание

У модулей, согласованных с принципом OCP, есть две основных характеристики.

1. Они *открыты для расширения*. Это означает, что поведение модуля можно расширить. Когда требования к приложению изменяются, мы добавляем в модуль новое поведение, отвечающее изменившимся требованиям. Иными словами, мы можем изменить состав функций модуля.
1. Они *закрыты для модификации*. Расширение поведения модуля не сопряжено с изменениями в исходном или двоичном коде модуля. Двоичное исполняемое представление модуля, будь то компонуемая библиотека, DLL или EXE-файл, остается неизменным.

Может показаться, что эти характеристики противоречивы. Обычно расширение поведения модуля предполагает изменение его исходного
кода. Поведение модуля, который нельзя изменить, принято считать фиксированным.

Возможно ли изменить поведение модуля, не трогая его исходного кода? Как можно изменить состав функций модуля, не изменяя сам модуль?

С помощью абстракции. В Java, как и в любом другом объектно-ориентированном языке программирования, можно создавать абстракции, которые сами по себе фиксированы, но представляют неограниченное множество различных поведений. Абстракции – это абстрактные базовые классы, а поведения представляются производными от них классами.

Модуль может манипулировать абстракцией. Такой модуль можно сделать закрытым для модификации, поскольку он зависит от фиксированной абстракции. Тем не менее поведение модуля можно расширять, создавая новые производные от абстракции.

На рисунке ниже изображен простой дизайн, нарушающий принцип OCP. Классы ```Client``` и ```Server``` конкретные. Класс ```Client``` использует класс ```Server```. Если мы захотим, чтобы объект ```Client``` использовал другой серверный объект, то класс ```Client``` придется изменить, указав в нем имя нового серверного класса.

![_](./img/solid/ocp-img-01.png)

*Класс Client не является открытым и закрытым*

На следующем рисунке показан дизайн, который согласуется с принципом OCP за счет применения паттерна Стратегия. В данном случае класс ```ClientInterface``` абстрактный и содержит только абстрактные методы. Класс ```Client``` использует эту абстракцию. Однако объекты класса ```Client``` будут пользоваться объектами производного класса ```Server```. Если мы захотим, чтобы объекты ```Client``` пользовались другим серверным классом, то сможем создать новый класс, производный от ```ClientInterface```. Сам класс ```Client``` при этом не изменится.

![_](./img/solid/ocp-img-02.png)

*Паттерн Стратегия: класс Client является одновременно открытым и закрытым*

У класса ```Client``` есть определенные функции, которые можно описать в терминах абстрактного интерфейса ```ClientInterface```. Подтипы ```ClientInterface``` могут реализовывать этот интерфейс, как сочтут нужным. Таким образом, поведение, специфицированное в классе ```Client```, можно расширять и модифицировать путем создания новых подтипов ```ClientInterface```.

Возможно, вы недоумеваете, почему я назвал ```ClientInterface``` именно так. Почему не ```AbstractServer```, например? А дело в том, что, как мы увидим ниже, *абстрактные классы более тесно ассоциированы со своими клиентами, чем с реализующими их конкретными классами*.

На рисунке ниже показана альтернативная структура на основе паттерна Шаблонный метод. В классе Policy есть набор открытых конкретных методов, реализующих некоторую политику; они аналогичны методам класса Client из предыдущего примера. Как и раньше, эти методы описывают определенные функции в терминах абстрактных интерфейсов. Но теперь эти абстрактные интерфейсы являются частью самого класса Policy. В Java они описывались бы как абстрактные методы. Реализуются они в подтипах Policy. Таким образом, поведения, описанные внутри Policy, можно расширять или модифицировать путем создания классов, производных от Policy.

![_](./img/solid/ocp-img-03.png)

*Паттерн Шаблонный метод: базовый класс является одновременно открытым и закрытым*

Эти два паттерна – наиболее распространенные способы удовлетворить принципу OCP. Они позволяют добиться четкого отделения общей функциональности от деталей ее реализации.

Во многих отношениях принцип открытости/закрытости – основа основ объектно-ориентированного проектирования. Именно следование этому принципу позволяет получить от ООП максимум обещанного: гибкость, возможность повторного использования и удобство сопровождения. Но чтобы удовлетворить ему, недостаточно просто использовать какой-нибудь
ОО язык программирования. И бездумно применять абстракции ко всем вообще частям приложения тоже не стоит. Надо, чтобы разработчики осознанно применяли абстракции только к тем фрагментам программы, которые часто изменяются. *Отказ от преждевременного абстрагирования столь же важен, как и само абстрагирование.*

Адаптировал: [Кротов Артём](https://fb.com/artem.v.krotov).

Остались вопросы? Задавай в [нашем чате](https://t.me/technicalexcellenceru).