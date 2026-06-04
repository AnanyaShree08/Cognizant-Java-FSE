import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    public static void main(String[] args)
            throws Exception {

        ServerSocket server =
                new ServerSocket(5000);

        Socket socket =
                server.accept();

        BufferedReader br =
                new BufferedReader(
                        new InputStreamReader(
                                socket.getInputStream()
                        )
                );

        System.out.println(
                "Client: " + br.readLine()
        );

        socket.close();
        server.close();
    }
}