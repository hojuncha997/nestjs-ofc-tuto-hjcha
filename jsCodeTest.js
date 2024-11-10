/*
애너그램(anagram)으로 팰린드롬 만들기
: 주어진 문자열로 팰린드롬을 만들 수 있으면 팰린드롬 만들어서 반환
    만약 불가하다면 false 반환
*/

function makePalindrome(S) {
    let charCount = {};
    // 개별 문자가ㅏ charCount객체에 속하는지 확인하고 있는 경우 1증가. 없으면 추가하고 1로 초기화
    for( let char of S) {
        if( char in charCount) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }
    //console.log(charCount)  //{ A: 2, B: 2, D: 1 }

    let oddCount = 0;
    let oddChar = '';
    let evenChars = [];

    for (let char in charCount) {
        if(charCount[char] % 2 === 0) { // 문자의 개수가 2의 배수인 경우, evenChars배열에 넣는다.
            for( let i = 0; i < charCount[char] / 2; i++) {
                evenChars.push(char);
            }
        } else {    // 개수가 2의 배수가 아닌 경우, 예를 들어 개수가 1,3 등 나머지가 1이 되는 경우
            oddCount++;
            oddChar = char;
            
            // 증가 되기 전의 현재 오드 카운트가 1보다 큰 경우 false반환. 홀수개인 문자가 2개 이상이면 가운데 놔도 팰린드롬이 되지 않으므로
            if(oddCount > 1) {
                return false;
            }

            // 그렇지 않은 경우 evenchars배열에 넣기
            for( let i = 0; i < Math.floor(charCount[char] /2 ); i++) {
                evenChars.push(char);
            }
        }
    }
    // evenChars배열을 스트링으로 만들고, 그 역순으로 만든 배열을 스트링으로 만들고, 가운데에는 홑수인 문자를 넣어서 합친다
    let palindrome = evenChars.join('') + oddChar + evenChars.reverse().join('');
    return palindrome;
}

console.log(makePalindrome('ABDDDAB'));   //ABDBA
console.log(makePalindrome('ABDAB23')); //false
