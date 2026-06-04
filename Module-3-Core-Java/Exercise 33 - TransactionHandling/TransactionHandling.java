import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class TransactionHandling {

    public static void main(String[] args) {

        String url =
                "jdbc:mysql://localhost:3306/bankdb";

        String user = "root";
        String password = "root";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,
                            user,
                            password
                    );

            con.setAutoCommit(false);

            PreparedStatement debit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance = balance - ? WHERE id = ?"
                    );

            debit.setDouble(1, 1000);
            debit.setInt(2, 1);

            PreparedStatement credit =
                    con.prepareStatement(
                            "UPDATE accounts SET balance = balance + ? WHERE id = ?"
                    );

            credit.setDouble(1, 1000);
            credit.setInt(2, 2);

            debit.executeUpdate();
            credit.executeUpdate();

            con.commit();

            System.out.println(
                    "Transaction Successful"
            );

            con.close();

        } catch (Exception e) {

            System.out.println(e.getMessage());
        }
    }
}