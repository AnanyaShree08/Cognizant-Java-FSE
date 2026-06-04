import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaExpressions {

    public static void main(String[] args) {

        List<String> names =
                new ArrayList<>();

        names.add("Ravi");
        names.add("Aman");
        names.add("Kiran");
        names.add("Zoya");

        Collections.sort(
                names,
                (a, b) -> a.compareTo(b)
        );

        System.out.println(names);
    }
}