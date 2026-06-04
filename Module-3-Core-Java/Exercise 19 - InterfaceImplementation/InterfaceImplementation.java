interface Playable {
    void play();
}

class Guitar implements Playable {

    @Override
    public void play() {
        System.out.println("Playing Guitar");
    }
}

class Piano implements Playable {

    @Override
    public void play() {
        System.out.println("Playing Piano");
    }
}

public class InterfaceImplementation {

    public static void main(String[] args) {

        Playable guitar = new Guitar();
        Playable piano = new Piano();

        guitar.play();
        piano.play();
    }
}