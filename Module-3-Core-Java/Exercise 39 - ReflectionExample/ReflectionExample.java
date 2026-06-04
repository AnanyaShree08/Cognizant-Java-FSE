import java.lang.reflect.Method;

public class ReflectionExample {

    public void greet() {
        System.out.println("Hello Reflection");
    }

    public static void main(String[] args)
            throws Exception {

        Class<?> cls =
                Class.forName(
                        "ReflectionExample"
                );

        Object obj =
                cls.getDeclaredConstructor()
                        .newInstance();

        Method[] methods =
                cls.getDeclaredMethods();

        for (Method method : methods) {

            System.out.println(
                    method.getName()
            );
        }

        Method m =
                cls.getDeclaredMethod(
                        "greet"
                );

        m.invoke(obj);
    }
}