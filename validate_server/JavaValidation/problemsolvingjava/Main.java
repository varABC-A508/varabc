import java.io.*;
import java.util.*;

public class Main {
	private static BufferedReader br;
	private static int N,answer;
	private static StringTokenizer st;
	private static int[] T;
	private static int[] P;
	private static int[] dp;
    private static int[][] mtest;

	public static void main(String[] args) throws NumberFormatException, IOException {
		input();
		//백트래킹으로 먼저 짜봅니다.
		//현재 날짜에서부터 현재상담을 고르고 다음날로갈지, 안고르고 갈지를 결정하자.
		dp = new int[N];
        mtest = new int[1000][10000];
		Arrays.fill(dp, -1);	//디피 배열의 차원수는 백트함수의 인자개수, -1로 초기화.
		System.out.println(findMaxDP(0));
	}

	//백트를 먼저 짜고 디피를 넣어주자.
	private static void findMax(int curday,int cost) {
		//기저조건, 목표 날짜에 도달하면 answer와 비교하고 종료,
		if (curday==N) {
			if (answer<cost) {
				answer=cost;
			}
			return;
		}
		int max=Integer.MAX_VALUE;
		//목표날짜를 넘어갔으면 정답이 될 수 없는 값을 더해주고 종료
		if (curday>N) {
			cost-=1600000000;	//정답이 안되게 아주 낮은 값을 줘버리는겨
			return;
		}
		//오늘 고를 수 있는애를 고르고가던가
		findMax(curday+T[curday], cost+P[curday]);
		//안고르고 내일로 가던가
		findMax(curday+1, cost);
	}
	
	//탑 다운 디피
	private static int findMaxDP(int curday) {
		//기저조건, 목표 날짜에 도달하면 0을 리턴
		if (curday==N) {
			return 0;
		}
		//목표날짜를 넘어갔으면 정답이 될 수 없는 값을 더해주고 종료
		if (curday>N) {
			return -1600000000; //정답이 안되게 아주 낮은 값을 줘버리는겨
		}
		int temp=Math.max(findMaxDP(curday+1), findMaxDP(curday+T[curday])+P[curday]);
		if (dp[curday]==-1) {
			dp[curday]=temp;
			return temp;
		}else {
			return dp[curday];
		}
	}

	private static void input() throws NumberFormatException, IOException {
		br= new BufferedReader(new InputStreamReader(System.in));
		N=Integer.parseInt(br.readLine());
		T= new int[N];
		P= new int[N];
		for (int i = 0; i < N; i++) {
			st= new StringTokenizer(br.readLine());
			T[i]=Integer.parseInt(st.nextToken());
			P[i]=Integer.parseInt(st.nextToken());
		}
	}
}