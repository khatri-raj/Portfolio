from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField(blank=True)
    tech_stack = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

class Experience(models.Model):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # null if still working
    city = models.CharField(max_length=100, blank=True, null=True)  # ✅ new field

    def __str__(self):
        return f"{self.role} at {self.company}"