import java.util.List;

record Person(String name, int age) {}

public class RecordsExample {

    public static void main(String[] args) {

        List<Person> people =
                List.of(
                        new Person("Alice", 20),
                        new Person("Bob", 15),
                        new Person("Charlie", 25)
                );

        people.stream()
                .filter(p -> p.age() >= 18)
                .forEach(System.out::println);
    }
}