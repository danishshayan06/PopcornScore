create database PopcornScoreDB
go
use PopcornScoreDB
go


drop table Users
drop table Titles
drop table People
drop table Reviews
drop table MTS_CAST
drop table Wishlist

CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1, 1),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass_hash VARCHAR(255) NOT NULL,
    
);

CREATE TABLE Titles (
    title_id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(256) NOT NULL,
    type VARCHAR(50) NOT NULL, 
    release_date DATE NOT NULL,
    poster_url VARCHAR(256) NOT NULL,
    cover_url VARCHAR(256) NOT NULL,
    trailer_url VARCHAR(256),
    summary TEXT,
    
    -- This prevents the exact same title/type/date combo from being inserted twice
    CONSTRAINT UQ_Title_Identity UNIQUE (title, type, release_date)
);
CREATE TABLE Genres (
    genre_id INT PRIMARY KEY IDENTITY(1,1),
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Title_Genres (
    title_id INT FOREIGN KEY REFERENCES Titles(title_id),
    genre_id INT FOREIGN KEY REFERENCES Genres(genre_id),
    PRIMARY KEY (title_id, genre_id)
);

CREATE TABLE People (
    people_id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(256) NOT NULL,
    picture_url VARCHAR(256) NOT NULL,
    bio TEXT,
    birth_date DATE
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY IDENTITY(1,1),
    rating INT NOT NULL CHECK (rating > 0 AND rating < 11),
    comment TEXT,
    user_id INT NOT NULL,
    title_id INT NOT NULL,
    review_date DATETIME DEFAULT GETDATE(), 
    
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
    FOREIGN KEY(title_id) REFERENCES Titles(title_id),
    
    CONSTRAINT UQ_User_Title_Review UNIQUE (user_id, title_id)
);

CREATE TABLE MTS_CAST (
    cast_id INT PRIMARY KEY IDENTITY(1,1), 
    
    title_id INT NOT NULL,
    people_id INT NOT NULL,
    
    character_name VARCHAR(256) NULL, 
    
    -- e.g., 'Actor', 'Director', 'Producer'
    role VARCHAR(50) NOT NULL, 

    FOREIGN KEY (title_id) REFERENCES Titles(title_id),
    FOREIGN KEY (people_id) REFERENCES People(people_id),

    CONSTRAINT UQ_Cast_Member UNIQUE (title_id, people_id, role)
);

CREATE TABLE Wishlist (
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    title_id INT FOREIGN KEY REFERENCES Titles(title_id),
    added_at DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (user_id, title_id) 
);