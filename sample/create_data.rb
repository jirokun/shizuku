require 'faker'
Faker::Config.locale = :ja

puts "making data..."
open('create_table.sql', 'w') do |f|
  f.puts <<EOT
drop table if exists transactions;
drop table if exists users;
create table users (
	id varchar(10) primary key,
	sei varchar(20),
	mei varchar(20),
	age int,
	specialty varchar(5),
	employment varchar(100),
	employee_number int,
	last_login timestamp
);

create table transactions (
	id int primary key,
	user_id varchar(10) references users(id),
	amount bigint,
	created_date timestamp
);
EOT
end


users = "0000000001".upto("0001000000").map {|i| i }
specialties = 'A'.upto('Z').map do |c|
  '01'.upto('05').map { |num| c + num }
end.flatten
empolyments = 100.times.map {
  {
    :name => Faker::Company.name,
    :employee_number => rand(10000)
  }
}

open('users_data.sql', 'w') do |f|
  f.puts "COPY users (id, sei, mei, age, specialty, employment, employee_number, last_login) FROM stdin;"
  users.each do |user|
    employment = empolyments[rand(empolyments.size)]
    f.puts [user, Faker::Name.last_name, Faker::Name.first_name, rand(60), specialties[rand(specialties.size)], employment[:name], employment[:employee_number], Faker::Time.backward(1000, :evening).strftime('%Y-%m-%d %H:%M:%S')].join("\t")
  end
end

open('transaction_data.sql', 'w') do |f|
  f.puts "COPY transactions (id, user_id, amount, created_date) FROM stdin;"
  1.upto(1000000) do |i|
    f.puts [i, users[rand(users.size)], rand(10000) + 100, Date.today - rand(1000)].join "\t"
  end
end

puts <<EOT
psql <database> < create_table.sql
psql <database> < users_data.sql
psql <database> < transaction_data.sql
EOT
