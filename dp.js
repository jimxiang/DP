process.stdin.setEncoding('utf8');

var arr = [], // 接收输入参数的数组
    bool = 0, // 判断是否满足输入条件
    n = 0, // 数列元素个数
    longest = 1, // 最长不下降子序列长度
    a = [], // 数列元素数组
    seq = [], // 最长不下降子序列
    dp = []; // 动态规划过程中子序列长度数组

process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if(chunk !== null) {
        arr.push(chunk.trim());
    }

    if(bool >= 2) {
        n = parseInt(arr[0]);
        process.stdin.emit('end');
    }

    bool++;
});

process.stdin.on('end', function() {
    a = arr.slice(1).join(" ").split(" ").map(function(index, elem) {
        return parseInt(index);
    });
    if(n !== a.length) {
        process.stdout.write('长度不一致');
        return;
    }

    for(let i = 0; i < n; i++) {
        seq[i] = -1;
        dp[i] = 1;
    }

    for(let i = 1; i < n; i++) {
        for(let j = 0; j < i; j++) {
            if(a[i] > a[j]) {
                dp[i] = Math.max(dp[j] + 1, dp[i]);
                (function(index, arg) {
                    seq[index] = arg;                    
                })(i, j);
            }
            longest = Math.max(dp[i], longest);
        }
    }
    
    console.log(`最长长度为：${longest}`);

    process.stdout.write('end');
});