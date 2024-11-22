# Принцип подстановки Барбары Лисков (LSP)

Оригинальный текст из книги Робертом Мартина [Agile Principles, Patterns, and Practices](https://www.amazon.com/Agile-Principles-Patterns-Practices-C/dp/0131857258).

Механизмы, лежащие в основе принципа открытости/закрытости – абстрагирование и полиморфизм. В статически типизированных языках, к числу которых относится и Java, один из главных механизмов поддержки абстрагирования и полиморфизма – наследование. Именно наследование позволяет нам создавать производные классы, реализующие абстрактные методы, объявленные в базовых классах.

Какими правилами проектирования мы руководствуемся, когда решаем, как воспользоваться наследованием? Каковы характеристики наилучших иерархий наследования? Какие подводные камни приводят к иерархиям, не удовлетворяющим принципу OCP? На эти вопросы отвечает принцип подстановки Лисков (LSP).

---
**Принцип подстановки Лисков (Liskov Substitution Principle).**

*Должна быть возможность вместо базового типа подставить любой его подтип.*

---

Этот принцип был сформулирован [Барбарой Лисков](https://www.cs.tufts.edu/~nr/cs257/archive/barbara-liskov/data-abstraction-and-hierarchy.pdf) в 1988 году. Она писала:

> Мы хотели бы иметь следующее свойство подстановки: если для каждого объекта o<sub>1</sub> типа S существует объект o<sub>2</sub> типа T, такой, что для любой программы P, определенной в терминах T, поведение P не изменяется при замене o<sub>1</sub> на o<sub>2</sub>, то S является подтипом T.

Важность этого принципа становится очевидной, если рассмотреть последствия его нарушения. Предположим, что имеется функция f, принимающая в качестве аргумента ссылку на некоторый базовый класс B. Предположим также, что при передаче функции f ссылки на объект класса D, производного от B, она ведет себя неправильно. Тогда D нарушает принцип LSP. Понятно, что класс D оказывается хрупким в присутствии f.

У авторов f может возникнуть искушение включить некоторый тест для D, проверяющий, что f правильно ведет себя при передаче ей D. Но такой тест нарушает принцип OCP, потому что f теперь не закрыта от других классов, производных от B. Подобные тесты демонстрируют неопытность разработчиков или, что еще хуже, чрезмерно поспешную
реакцию на нарушение LSP.

Принцип открытости/закрытости лежит в основе многих требований объектно-ориентированного проектирования. Если этот принцип соблюден, то приложение более надежно, лучше поддается сопровождению и пригодно для повторного использования. Принцип подстановки Лисков – один из основных инструментов реализации принципа OCP. Возможность подстановки подтипов позволяет без модификации расширять модуль, выраженный в терминах базового типа. И это то, на что разработчики вправе рассчитывать по умолчанию. Поэтому контракт базового типа должен быть хорошо и ясно понятен, если неявно навязан, из кода.

Термин ЯВЛЯЕТСЯ слишком широк, чтобы служить определением подтипа. Правильное определение подтипа – заместим, где возможность замены определяется явным или неявным контрактом.

Адаптировал: [Кротов Артём](https://fb.com/artem.v.krotov).

Остались вопросы? Задавай в [нашем чате](https://t.me/technicalexcellenceru).