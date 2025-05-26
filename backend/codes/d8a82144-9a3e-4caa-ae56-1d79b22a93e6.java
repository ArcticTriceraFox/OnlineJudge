import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read two space-separated integers from one line
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        // Print their sum
        System.out.println(a + b);

        scanner.close();
    }
}
