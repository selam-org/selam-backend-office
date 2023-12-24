import django_filters

from django.db.models import Q




class PaymentInfoFilter(django_filters.FilterSet):
    receiver = django_filters.CharFilter(method='filter_by_receiver')

    def filter_by_receiver(self, queryset, name, value):
        receivers = [int(id) for id in value.split(",")]
        return queryset.filter(receiver__id__in=receivers)
