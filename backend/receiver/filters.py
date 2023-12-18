import django_filters

from django.db.models import Q


class ReceiverFilter(django_filters.FilterSet):
    sender = django_filters.CharFilter(method='filter_by_sender')

    def filter_by_sender(self, queryset, name, value):
        senders = [int(id) for id in value.split(",")]
        return queryset.filter(sender__id__in=senders)
