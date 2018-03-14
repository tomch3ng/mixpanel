/* ========================================================
 * Concurrent Users 
 * How many users are active on the site at a given moment
 * "timeslice" is in minutes - default is 5
 */
params = {
    start_date: "2018-03-13",
    end_date: "2018-03-13",
    timeslice: 5
  };
  
  function main() {
    return Events({
      from_date: params.start_date,
      to_date: params.end_date
    })
    .groupByUser([mixpanel.numeric_bucket('time', {bucket_size: params.timeslice * 60 * 1000})], mixpanel.reducer.null())
    .map(function(bucket){
      var ts = bucket.key[1];
      bucket.key[1] = new Date(ts).toLocaleString('en-US', { timeZone: 'America/New_York'});
      return bucket;
    })
      .groupBy(["key.1"], mixpanel.reducer.count());
  
  }