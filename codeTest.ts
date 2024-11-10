//pnpm exec ts-node codeTest.ts

/*
	1. 범인은 밀크티를 훔쳐 강당의 10번째 줄로 들어갔다.
	2. 범인은 파란색 신발을 신고 있었다.
	3. 범ㅣㄴ의 이름표를 정확히 보진 못했지만 마지막 이름은 '수'로 끝난다.
*/

const students = [
	//[], 1~9줄 정보 ...
	[	{name: '철수', shoes: 'red'}, 
		{name: '민수', shoes: 'blue'},
		{name: '지민', shoes: 'black'},
		{name: '태현', shoes: 'blue'},
		{name: '승우', shoes: 'green'},
	],
		//[], 11번째 줄 정보 ...
];

const culprit = students
	.find((line, index) => index === 0)	// truthy 이므로 해당 원소(여기서는 배열)을 반환한다
	.find((individual) => 	// 원소 배열을 다시 순회해서 객체를 찾는다
		individual.name.endsWith('수') && individual.shoes === 'blue'
	);

	// if(index === 9) 이게 맞지만 여기서는 다른 줄을 생략했으므로 0으로 써야한다.

	// find() 메서드는 콜백 함수가 truthy로 평가되는 조건을 만났을 때해당 요소 자체를 반환한다
	// 따라서 아래 구문은 민수를 반환하는 것이 아니라 배열 자체를 반환하는 것이다.
	
	// if(index === 0) {
	// 	return line.find((student) => student.name.endsWith('수') && student.shoes === 'blue');
	// }

console.log(culprit);

// { name: '민수', shoes: 'blue' }

