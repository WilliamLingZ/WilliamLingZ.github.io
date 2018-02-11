function getStats(txt) {
	
	function CompareFrequency(V1, V2) {
		if(V1[1] < V2[1]) return 1 ;
		if(V1[1] > V2[1]) return -1;
		return 0;
	}
	
	let nChars = txt.length;
	let nWords = txt.split(/[^0-9A-Za-z]/).filter(function(zlength) {return zlength.length !=0}).length;
	let nLines = 0;
	if (txt.length != 0)
		nLines = txt.split("\n").length;
	let Lines = txt.split("\n");
	for(i = 0; i < nLines; i++) {
		Lines[i] = Lines[i].replace(/\s/g, '');
	}
	let nNonEmptyLines = Lines.filter(function(zlength) {return zlength.length !=0}).length;
	let Words = txt.split(/[^0-9A-Za-z]/).filter(function(zlength) {return zlength.length !=0});
	let TotalLength = 0;
	for(i = 0; i < Words.length; i++) {
		TotalLength += Words[i].length;
	}
	let averageWordLength = TotalLength / nWords;
	Lines = txt.split("\n");
	Lines = Lines.sort(function(a, b) {return b.length - a.length});
	let maxLineLength = Lines[0].length;
	let palindromes = [];
	for(i = 0; i < Words.length; i++) {
		Words[i] = Words[i].toLowerCase();
		let isPalindrome = true;
		for(j = 0; j < Words[i].length / 2; j++) {
			if(Words[i][j] != Words[i][Words[i].length - 1 - j]) {
				isPalindrome = false;
				break;
			}
		}
		if(isPalindrome == true) {
			let unique = true;
			for(k = 0; k < palindromes.length; k++) {
				if(palindromes[k] == Words[i])
					unique = false;
			}
			if(unique == true)
				palindromes.push(Words[i]);
		}
	}
	let sortByLength = Words.sort(function (a, b) {return b.length - a.length || a.localeCompare(b)});
	let longestWords = sortByLength.slice(0,10);
	
	let uniqueWords = [];
	for(i = 0; i < Words.length; i++) {
		let unique = true;
		for(j = 0; j < uniqueWords.length; j++) {
			if(uniqueWords[j][0] == Words[i])
				unique = false;
		}
		if(unique == true) {
			uniqueWords.push([Words[i],0]);
		}
	}
	for(i = 0; i < uniqueWords.length; i++) {
		for(j = 0; j < Words.length; j++) {
			if(uniqueWords[i][0] == Words[j])
				uniqueWords[i][1]++;
		}
	}
	uniqueWords = uniqueWords.sort(CompareFrequency);
	let temp = uniqueWords.slice(0,10);
	let mostFrequentWords = [];
	console.log(temp);
	for(i = 0; i < temp.length; i++) {
		mostFrequentWords.push(temp[i][0] + "(" + temp[i][1] + ")");
	}

    return {
        nChars,
        nWords,
        nLines,
        nNonEmptyLines,
        averageWordLength,
        maxLineLength,
        palindromes,
        longestWords,
        mostFrequentWords
    };
}

