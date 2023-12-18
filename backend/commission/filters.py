import django_filters
from django.db.models import Q



class CommissionFilter(django_filters.FilterSet):
    agency = django_filters.CharFilter(method='filter_by_agency')

    def filter_by_agency(self, queryset, name, value):
        agency = [int(id) for id in value.split(",")]
        return queryset.filter(agency__id__in=agency)
