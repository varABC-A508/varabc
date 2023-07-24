import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int a = sc.nextInt();
		int b = sc.nextInt();
		int[] arr = new int[2];
		int size = 0;
		
		for (int i = -2000; i <= 2000; i++) {
			if (i*i + 2*a*i + b == 0) {
				arr[size++] = i; 
				if (size == 2) break; 
			}
		}
		
		for (int i = 0; i < size; i++) {
			System.out.print(arr[i] + " ");
		}
	} 
} 
