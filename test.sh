tar -zcvf submission.tar.gz Longest_repeated_substring-master
gunzip submission.tar.gz
mkdir submission
mv submission.tar submission/
cd submission
tar -xf submission.tar
make -s compile
cat input1 | make -s run 1>output1 2>/dev/null
diff -q output1 answer1
