var suffixes = []
var original = {}

// Suffix Array and data structure API /////////////////////////////////

/* overview: this object defines the properties and actions of a singular suffix
   within the collection.
   property fields are dynamically created at runtime
*/
const Suffix = {

   length:

      function() {
         // console.log("Suffix length(): %s, %s", this.n, this.index);
         return original.n - this.index;
      },

   charAt:

      function(i) {
         return original.text.charAt(this.index + i);
      }
}


/* overview: represents the collection of a string's suffixes.
   while the current string is not null, we compute a new suffix by removing
   the firstmost charcter of the string.
*/
const SuffixArray = {

   // overview: init and construct suffix array then sort lexographically
   New:

      function(text){
         const n = text.length
         original['n'] = n + 1
         original['text'] = text

         for (var i = 0; i < n; i++) {
            suffixes[i] = Object.assign({}, Suffix);
            suffixes[i]['index'] = i
            suffixes[i]['text'] = text
            text = text.slice(1)
         }

         suffixes.sort(function(a, b){
            if(a.text < b.text) return -1;
            if(a.text > b.text) return 1;
            return 0;
         })
      },


   /* overview: private function of the object
      computes the longest common prefix between
      two input strings
   */
   _lcp:

      function(s, t){ // Suffix types
         // console.log(`lcp call: ${s.length()} ${t.length()}\n\n`);
         const n = Math.min(parseInt(s.length()), parseInt(t.length()));
         // console.log("n: ",n);
         for (var i = 0; i < n; i++) {
            //  console.log(i);
            if (s.charAt(i) !== t.charAt(i)) return i;
         }
         //  console.log();
         return n;
      },


   /* overview: the public API which drives the functionality
      behind computing the longest common prefix between
      two input strings
   */
   lcp:

      function(i){
         if (i < 1 || i >= suffixes.length){
            return undefined
         }
         return this._lcp(suffixes[i], suffixes[i-1]);
      }
}


// Client-facing cli driver /////////////////////////////////////////////
/*
   ssh phozier@elnux.cs.umass.edu
   to run:
   u: UMass NetID
   p: updated pass'd

   cat input1.txt | make -s run 1>output1 2>/dev/null
*/
var assignment = {

   // overview: creation of the readline interface
   readline:

      function(){
         const readline = require('readline')
         const readable_stream = readline.createInterface({
            input: process.stdin,
            output: process.stdout
         })

         return readable_stream
      },



   /* overview: consume the input str from stdin.
   "listens" for the line event to be triggered

   the construction of an event lsitener enables this behavior
   */
   stdin:

      function(algorithm){
         const read = assignment.readline()
         const out = read.output
         // out.write("> ")

         read.on('line', function(line){
            // console.log(`Received: ${line}`);

            // overview: run algorithm on given input
            algorithm(line)
            // out.write("> ")
         })
      },



   /* overview: finds the largest subtring in S which appears at least 2x
   */

   // motivaton: uses o n^2 time and space complexity
   //
   solution:

      function(){
         // console.log("CMPSCI 311: Introduction to Algorithms \
         // F16 Programming Assignment\n")

         // overview: stdin caller accepts a callback named "algorithm"
         // the callback algorithm returns the computed longest repeated substring to stdout

         // params: text: accepts the string input from stdin
         assignment.stdin(function(text){
            const n  = text.length
            SuffixArray.New(text)

            // console.log(suffixes);
            var lrs = ""
            for (var i = 1; i < n; i++) {
               var length = SuffixArray.lcp(i)
               if(length === undefined){ continue }

               if (length > lrs.length ) {
                  lrs = text.substring(suffixes[i]['index'], suffixes[i]['index'] + length);
               }
            }

            // overview: the solution string
            console.log(lrs);
            suffixes = []
            original = {}
         })
      }
}

assignment.solution()
