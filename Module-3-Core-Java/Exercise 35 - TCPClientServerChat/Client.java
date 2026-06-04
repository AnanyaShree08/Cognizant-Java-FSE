import java.io.PrintWriter;
import java.net.Socket;

public class Client {

    public static void main(String[] args)
            throws Exception {

        Socket socket =
                new Socket(
                        "localhost",
                        5000
                );

        PrintWriter pw =
                new PrintWriter(
                        socket.getOutputStream(),
                        true
                );

        pw.println("Hello Server");

        socket.close();
    }
}