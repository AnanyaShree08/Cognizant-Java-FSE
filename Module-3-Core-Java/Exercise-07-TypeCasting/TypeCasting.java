public class TypeCasting {
    public static void main(String[] args) {

        double d = 123.45;
        int i = (int) d;

        int number = 50;
        double converted = (double) number;

        System.out.println("Double value: " + d);
        System.out.println("Double to Int: " + i);

        System.out.println("Int value: " + number);
        System.out.println("Int to Double: " + converted);
    }
}