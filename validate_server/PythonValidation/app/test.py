# test.py
# -*- coding: utf-8 -*-
# test.py
# -*- coding: utf-8 -*-
import sys
sys.setrecursionlimit(10**8)
input=sys.stdin.readline
'''
완탐 로직: 1,500,000개의 날을 하나씩 골라가면서 가능한 애들을 챙긴다
상담한다,안한다로 2^1500000 -> 최댓값을 구하기

백트래킹으로 구현하고-> 디피를 적용하는 방식으로 문제푸는 것을 연습해보자.
N일차일때 상담 받을 수 있는 금액
시간, 금액
N일을 넘어가게 되면 해당 금액은 받을 수 없음

'''

#입력
N=int(input())
timelist=[0]
costlist=[0]
for i in range(N):
    a,b=map(int,input().split())
    timelist.append(a)
    costlist.append(b)
#구현

answer=0
#백트 구현하기
#N일이 지나면 함수를 종료해야함, 날짜와 현재까지 담은 날을 가지고 가자

def backTrack(day,cost):
    global answer
    #기저조건
    if day>N+1:
        #넘어갔으면 답이 될 수 없지
        return
    if day==N+1:
        #N+1일이 되었다면 퇴사
        #지금까지 저장된 최대 수익과 비교하기
        answer=max(cost,answer)
        return
    #구현부, 뽑을수 있을때 , 뽑고 넘어가는 것과 뽑지 않고 넘어가는 모든 동작을 처리
    backTrack(day + timelist[day], cost + costlist[day])
    # 뽑지 않고 다음날을 보기
    backTrack(day + 1, cost)


#dp로 구현하면 dp는 인자의 개수만큼의 차원을 가지고
#현재 날짜의 최대 cost를 저장할 배열
dp=list(-1 for _ in range(N+1))
def dpTrack(day):
    global answer
    #기저조건
    if day>N+1:
        #넘어갔으면 답이 될 수 없지
        return -100000000
    if day==N+1:
        #N+1일이 되었다면 퇴사
        return 0
    if dp[day]!=-1:
        #값이 있다면 해당 값을 반환한다
        return dp[day]
    #구현부, 뽑을수 있을때 , 뽑고 넘어가는 것과 뽑지 않고 넘어가는 것을 비교하기
    dp[day]=max(dpTrack(day+1),dpTrack(day+timelist[day])+costlist[day])
    return dp[day]

# inputTest()
#backTrack(1,0)
#print(answer)
print(dpTrack(1))