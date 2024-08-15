from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def landingpage(request):
    return render(request, 'landing.html')

def signin(request):
    return render(request, 'signin.html')

def signup(request):
    return render(request,'signup.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def analytics(request):
    return render(request, 'analytics.html')

def profile(request):
    return render(request, 'profile.html')

def account(request):
    return render(request, 'account.html')

def report(request):
    return render(request, 'report.html')

def setting(request):
    return render(request, 'setting.html')

def message(request):
    # return HttpResponse("This is the messages page.")
    return render(request, 'message.html'),

def support(request):
    return render(request, 'support.html')

def all_reviews(request):
    return render(request, 'all-reviews.html')

def notification(request):
    return render(request, 'notification.html')