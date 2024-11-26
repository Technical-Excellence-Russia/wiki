# Порядок преобразований (TPP, the) [draft]

Оригинальный текст из статьи Робертом Мартина [The Transformation Priority Premise](https://blog.cleancoder.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html).

## Порядок преобразований (The Transformation Priority Premise)

19 Декабря 2010 года

Это статья предлагает довольно радикальный подход. Она подразумевает, что "[рефакторинг](Refactoring.md)" может подразумевать "_преобразования_". Если [рефакторинг](Refactoring.md) это набор простых операций, которые меняют структуру кода без изменения поведения, то _преобразования_ - поведение меняют. Они могут быть использованы, как единственный путь для исправления упавших тестов в [red/green/refactor](TDD.md) цикле. _Преобразования_ имеют приоритет или предпочтительный порядок, который может предотвратить тупиковые ситуации или длительные задержки в [red/green/refactor](TDD.md) цикле, если ему следовать при упорядочивании тестов.

> "В то время, как тесты становятся более конкретным, то код - более общим."

Недавно эта мантра обрела для меня новое значение.

Я изобрел её, как правило, чтобы уберечь своих студентов от приобретения отвратительной привычки писать код, который копирует тесты во время циклов [TDD](TDD.md):

````java
@Test
public void primeFactorsOfFour() {
  assertEquals(asList(),    PrimeFactors.of(1));
  assertEquals(asList(2),   PrimeFactors.of(2));
  assertEquals(asList(3),   PrimeFactors.of(3));
  assertEquals(asList(2,2), PrimeFactors.of(4));
  ...
}

public class PrimeFactors {
  public static of(int n) {
    if (n == 1)
      return asList();
    else if (n == 2)
      return asList(2);
    else if (n == 3)
      return asList(3);
    else if (n == 4)
      return asList(2,2);
    ...
````

Новички в [TDD](TDD.md) часто задаются вопросом, почему [TDD](TDD.md) не приводит if-else коду. Я обычно указываю на правило выше. Такой ответ удовлетворяет студентов, особенно когда я показываю эту идею на Prime Factors<sup>[1](#footnote-1)</sup>.

## Заметки

1. <a name="footnote-1"></a> Prime Factors Kata - [Kata](CodingDojoKata.md) для отработки навыков TDD.

Адаптировал: [Кротов Артём](https://github.com/timmson).

Остались вопросы? Задавай в [нашем чате](https://t.me/technicalexcellenceru).
