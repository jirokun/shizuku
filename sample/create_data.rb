require 'date'
users = "0000000001".upto("0000000030").map {|i| i }
1.upto(1000000) do |i|
  puts [i, users[rand(users.size)], rand(10000) + 100, Date.today - rand(1000)].join "\t"
end
