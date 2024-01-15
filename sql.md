# SQL

SQL = Structured Query Language

Relationsdatabaser

MySQL / MariaDB
Microsoft SQL (MSSQL)
Oracle DB

One-to-One (1:1)
One-to-Many (1:n)
Many-to-Many (n:n)

## Hämta data

### Hämta alla kolumner från tabellen employees

```sql
# Kommentar
SELECT * FROM employees;
```

### Hämta alla kolumner från tabellen employees där ID är 1

```sql
SELECT * FROM employees WHERE id = 1;
```

### Hämta id, name och title-kolumnerna från tabellen employees där ID är 1

```sql
SELECT id, name, title FROM employees WHERE id = 1;
```

### Hämta alla kolumner från tabellen employees där title inte är CEO

```sql
SELECT * FROM employees WHERE title != "CEO";
```

### Hämta alla kolumner från tabellen employees där lönen inte är 50000

```sql
SELECT * FROM employees WHERE salary <> 50000;
```

### Hämta alla kolumner från tabellen employees som inte har en lön

```sql
SELECT * FROM employees WHERE salary IS NULL;
```

### Hämta alla kolumner från tabellen employees som har en lön

```sql
SELECT * FROM employees WHERE salary IS NOT NULL;
```

### Hämta id, name och title-kolumnerna från tabellen employees där ID 1 eller 2 eller 3

```sql
SELECT id, name, title FROM employees WHERE id = 1 OR id = 2 OR id = 3;
```

### Hämta id, name och title-kolumnerna från tabellen employees där ID i [1, 2, 3]

```sql
SELECT id, name, title FROM employees WHERE id IN (1, 2, 3);
```

### Hämta id, name och title-kolumnerna från tabellen employees där ID inte är i [1, 2, 3]

```sql
SELECT id, name, title FROM employees WHERE id NOT IN (1, 2, 3);
```

### Hämta employees sorterade efter namn

```sql
SELECT * FROM employees ORDER BY name;
```

### Hämta employees sorterade efter salary i fallande ordning

```sql
SELECT * FROM employees ORDER BY salary DESC;
```

### Hämta högsta lönen

* AVG
* MAX
* MIN

```sql
SELECT MAX(salary) FROM employees;
```

### Hämta tre employees åt gången

```sql
SELECT * FROM `employees` LIMIT 3;
```

### Hämta nästa tre employees (men fortfarande bara 3 åt gången)

```sql
SELECT * FROM `employees` LIMIT 3 OFFSET 3;
```

## Skapa data

### Skapa employee "Bus Bengt"

```sql
INSERT INTO employees
  (`name`, `title`, `email`, `salary`)
VALUES
  ("Bus Bengt", "Buspojke", "bengan@bus.nu", 420000);

INSERT INTO employees
  SET `name` = "Bus Bengt", `title` = "Buspojke", `email` = "bengan@bus.nu", `salary` = 420000;
```

## Uppdatera data

### Ändra namn på employee ID 6

```sql
UPDATE employees SET `name` = "Bad Bengt", `title` = "Gangsta" WHERE id = 6;
```

## Radera data

### Ta bort employee med ID 4

```sql
DELETE FROM employees WHERE id = 4;
```
