public class Car {

    String make;
    String model;
    int year;

    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public void displayDetails() {
        System.out.println(
                year + " " + make + " " + model
        );
    }

    public static void main(String[] args) {

        Car car1 = new Car("Toyota", "Camry", 2023);
        Car car2 = new Car("Honda", "City", 2024);

        car1.displayDetails();
        car2.displayDetails();
    }
}