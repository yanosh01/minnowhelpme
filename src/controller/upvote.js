import steem from 'steem';

let comment = username => `Congratulations! This post has been upvoted by the account @minnowhelpme!

#### Don't forget to join [Steem Repo Discord Server](https://discord.gg/cX3KvsY)and to upvote @yanosh01 as witness.`;

function randomString() {
  let string = '';
  let allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 32; i++) {
    string += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length)
    );
  }
  return string + '-post';
}

function upvotePost(
  steem_posting_key,
  steem_username,
  author,
  permlink,
  weightage
) {
  return new Promise(function(resolve, reject) {
    steem.broadcast.vote(
      steem_posting_key,
      steem_username,
      author,
      permlink,
      weightage,
      function(err, result) {
        if (err) {
          reject('ERROR');
        } else if (!result) {
          reject('ERROR');
        } else if (!!result.id && !!result.block_num) {
          resolve(result);
        } else {
          reject('ERROR');
        }
      }
    );
  }).catch(err => 'ERROR');
}

function commentPost(
  steem_posting_key,
  steem_username,
  author,
  permlink
) {
  return steem.broadcast.comment(
    steem_posting_key, // posting wif
    author, // author, leave blank for new post
    permlink, // first tag or permlink
    steem_username, // username
    randomString(), // permlink
    '', // Title
    comment(author),
    {
      tags: ['steemrepo'],
      app: 'stephard/0.1'
    }, // json metadata (additional tags, app name, etc)
    function(err, result) {
      if (err) {
        console.log(err);
        throw 'err';
      }
      console.log(result);
    }
  );
}

export { upvotePost, commentPost };
