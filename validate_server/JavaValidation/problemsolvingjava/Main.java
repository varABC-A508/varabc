import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
	static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	
	public static void main(String[] args) throws NumberFormatException, IOException {
		int n = Integer.parseInt(br.readLine());
		
		int[] dp = new int[1001];
		
		dp[1] = 1;
		dp[2] = 2;
		
		for (int i = 3; i < n + 1; i++) {
			dp[i] = (dp[i-1] + dp[i-2]) % 10_007;
		}
		
		System.out.println(dp[n]);
	}
}