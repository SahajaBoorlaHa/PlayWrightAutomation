var arrayNum = [4,6,4,7,4];
for(var i=0; i<arrayNum.length; i++)
{
    for(var j=i+1; j<arrayNum.length-(i+1); j++)
    {
        if(arrayNum[i]==arrayNum[j])
        {
            arrayNum.pop(arrayNum[i])
            break;
        }
    }
}
console.log(arrayNum)