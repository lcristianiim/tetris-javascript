var words = 'style="background: yellow"';

function test(words) {
    var n = words.split(" ")
    return n[n.length - 1].split('"')[0];
}

console.log(test(words))

// var me = test(words).split('"');
// console.log(me[0]);
