import java.util.Scanner;

public class main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read two space-separated integers from one line
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        // Calculate and print the sum
        System.out.println(a + b);

        scanner.close();
    }
}
